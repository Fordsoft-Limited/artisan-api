import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { DuplicateResourceException } from "src/filters/app.custom.exception";
import { GlobalService } from "src/global/database/global.service";
import { Mapper } from "src/mapper/dto.mapper";
import {
  BlogCreateRequest,
  UserInvitationRequest,
} from "src/model/app.request.model";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { Blogs } from "src/model/blog.schema";
import { Category } from "src/model/contact.schema";
import { User } from "src/model/user.schema";
import { NotificationService } from "src/notification/notification.service";
import { UploadService } from "src/upload/upload.service";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";

@Injectable()
export class AdminService {
  constructor(
    private autService: AuthService,
    private fileUploadService: UploadService,
    private globalService: GlobalService,
    private notificationSerivce: NotificationService,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Blogs.name) private blogsModel: Model<Blogs>
  ) {}
  async getPaginatedUsers(
    page: number,
    limit: number
  ): Promise<ArtisanApiResponse> {
    return await this.autService.getPaginatedUsers(page, limit);
  }
  async addNewBlog(
    loginUser: any,
    file: Express.Multer.File,
    data: any
  ): Promise<ArtisanApiResponse> {
    const payloadData: BlogCreateRequest = JSON.parse(
      data.payload
    ) as BlogCreateRequest;
    const uploadedFile: string = await this.fileUploadService.uploadFile(file);
    const newBlog = new this.blogsModel({
      ...payloadData,
      mediaName: uploadedFile,
      author: loginUser.sub

    });
    await newBlog.save();
   
    return new ArtisanApiResponse(
      NotificationMessage.BLOG_PUBLISHED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
  async checkDuplicateUsername(
    userRequest: UserInvitationRequest
  ): Promise<void> {
    await this.globalService.checkDuplicate({
      ...userRequest,
      willIdReturn: false,
    });
    const existingUser = await this.userModel.findOne({
      username: userRequest.email,
    });
    if (existingUser) {
      throw new DuplicateResourceException(
        NotificationMessage.DUPLICATE_ACCOUNT
      );
    }
  }
  async sendInvitationToUser(
    invitationRequest: UserInvitationRequest
  ): Promise<ArtisanApiResponse> {
    await this.checkDuplicateUsername(invitationRequest);
    const savedContact = await this.globalService.createContact({
      ...invitationRequest,
      category: Category.User,
    });
    const notificationCode = await this.notificationSerivce.sendInvitationCode(
      invitationRequest.email
    );
    console.log("The code sent his this::::::::", notificationCode);
    const savedUser = new this.userModel({
      username: invitationRequest.email,
      contact: savedContact._id,
      invitationCode: notificationCode,
      isActive: false,
      isBlocked: false,
    });
    await savedUser.save();
    console.log("Record saved successfully");
    return new ArtisanApiResponse(
      NotificationMessage.INVITATION_SENT,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
  async getPaginatedVisitors(
    page: number,
    limit: number
  ): Promise<ArtisanApiResponse> {
    return this.autService.getPaginatedVisitors(page, limit);
  }
  async listBlog(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const visitors = await this.blogsModel
      .find()
      .populate({
        path: "author",
        populate: {
          path: 'contact',
          model: 'Contacts',
        },
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      visitors.map(item=>Mapper.mapToBlogs(item)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
}
