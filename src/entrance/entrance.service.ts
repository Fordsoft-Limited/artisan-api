import { Injectable } from "@nestjs/common";
import { LoginRequest } from "./model/login.model";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";
import { ArtisanApiResponse } from "src/model/app.response.model";
import {
  AccountActivationRequest,
  BlogCommentRequest,
  ChangePasswordRequest,
  ForgotPasswordRequest,
  RatingRequest,
  ResetPasswordRequest,
  VisitorRequest,
} from "src/model/app.request.model";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/model/contact.schema";
import { Guests } from "src/model/guest.schema";
import { AuthService } from "src/auth/auth.service";
import { GlobalService } from "src/global/database/global.service";
import { Blogs } from "src/model/blog.schema";
import { Mapper } from "src/mapper/dto.mapper";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";
import { Advertisement } from "src/model/advertisement.schema";
import { Artisan } from "src/model/artisan.schema";
import { RecordNotFoundException } from "src/filters/app.custom.exception";
import { Rating } from "src/model/rating.schema";
import { BlogComments } from "src/model/comments.schema";
import { User } from "src/model/user.schema";
import { UploadService } from "src/upload/upload.service";
import { Response } from 'express';


@Injectable()
export class EntranceService {
  constructor(
    private fileUploadService: UploadService,
    private authService: AuthService,
    private globalService: GlobalService,
    @InjectModel(Guests.name) private guestsModel: Model<Guests>,
    @InjectModel(Blogs.name) private blogsModel: Model<Blogs>,
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<Advertisement>,
    @InjectModel(Artisan.name) private artisanModel: Model<Artisan>,
    @InjectModel(Rating.name) private ratingModel: Model<Rating>,
    @InjectModel(BlogComments.name)
    private blogCommentModel: Model<BlogComments>,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}
  async downloadFile(fileName: string, res: Response): Promise<void> {
    await  this.fileUploadService.downloadFile(fileName, res);
  }
  async rateArtisan(payload: RatingRequest): Promise<ArtisanApiResponse> {
    const artisan = await this.artisanModel.findById(payload.artisanId);
    if (!artisan)
      throw new RecordNotFoundException(NotificationMessage.RECORD_NOT_FOUND);

    const newRating: Rating = new this.ratingModel({
      userId: payload.userId,
      rating: payload.rating,
    });
    artisan.totalRatings += payload.rating;
    artisan.ratingCount += 1;
    artisan.rank = artisan.totalRatings / artisan.ratingCount;
    await artisan.save();
    await newRating.save();
    return new ArtisanApiResponse(
      NotificationMessage.RATING_ADDED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async addComment(payload: BlogCommentRequest): Promise<ArtisanApiResponse> {
    const blog = await this.blogsModel.findById(payload.blogId);

    if (!blog) {
      throw new RecordNotFoundException(NotificationMessage.RECORD_NOT_FOUND);
    }

    const newBlogComment: BlogComments = new this.blogCommentModel({
      body: payload.body,
      blogId: payload.blogId,
      createdBy: payload.createdBy,
    });

    // Update blog's comments and commentCount properties
    blog.comments.push(newBlogComment); // Assuming comments is an array
    blog.commentCount = blog.comments.length;

    // Save the updated blog
    await blog.save();

    // Save the new blog comment
    await newBlogComment.save();

    return new ArtisanApiResponse(
      NotificationMessage.COMMENT_ADDED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async listPaginatedAdvertisement(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const advertisement = await this.advertisementModel
      .find()
      .populate({
        path: "contact",
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      advertisement.map((advertisement) =>
        Mapper.mapToAdvertisementResponse(advertisement)
      ),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async listPaginatedArtisan(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const artisan = await this.artisanModel
      .find()
      .populate({
        path: "contact",
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      artisan.map((artisan) => Mapper.mapToArtisanResponse(artisan)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
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
          path: "contact",
          model: "Contacts",
        },
      })
      .sort({createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      visitors.map((item) => Mapper.mapToBlogs(item)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async listRecentBlogs(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const recentBlogs = await this.blogsModel
      .find()
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        populate: {
          path: "contact",
          model: "Contacts",
        },
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      recentBlogs.map((item) => Mapper.mapToBlogs(item)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async activateAccount(
    payload: AccountActivationRequest
  ): Promise<ArtisanApiResponse> {
    return await this.authService.activateAccount(payload);
  }
  async login(login: LoginRequest): Promise<ArtisanApiResponse> {
    return await this.authService.validateLoginUser(login);
  }

  async createVisitRequest(
    visitorRequest: VisitorRequest
  ): Promise<ArtisanApiResponse> {
    await this.globalService.checkDuplicate({
      ...visitorRequest,
      willIdReturn: false,
    });
    // Create a new contact
    const savedContact = await this.globalService.createContact({
      ...visitorRequest,
      category: Category.Artisan,
    });

    // Create a new guests document with the reference to the contact
    const newGuest = new this.guestsModel({
      reasonForVisit: visitorRequest.reasonForVisit,
      methodOfContact: visitorRequest.methodOfContact,
      numberOfVisit: 1,
      contact: savedContact._id,
    });

    // Save the new guests document
    await newGuest.save();
    // Return a success response
    return new ArtisanApiResponse(
      NotificationMessage.VISITOR_FORM_SUBMITTED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async changedPassword(
    userId: string,
    payload: ChangePasswordRequest
  ): Promise<ArtisanApiResponse> {
    const user = await this.findUserByUsername(userId);
    if (
      !(await bcrypt.compare(payload.oldPassword, user.password))
    ) {
      throw new RecordNotFoundException(
        NotificationMessage.INVALID_OLD_PASSWORD
      );
    }
    user.password = await this.authService.hashPassword(
      payload.newPassword
    );
    await user.save();
    return new ArtisanApiResponse(
      NotificationMessage.PASSWORD_CHANGED_SUCCESSFULLY,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  public async findUserByUsername(username: string): Promise<User> {
    const existingUser = await this.userModel.findById(username).exec();
    if (!existingUser) {
      throw new RecordNotFoundException(NotificationMessage.INVALID_USER);
    }
    return existingUser;
  }

  async resetPassword(
    userId: string,
    resetPasswordRequest: ResetPasswordRequest
  ): Promise<ArtisanApiResponse> {
    const user = await this.findUserByUsername(userId);

    if (resetPasswordRequest.oldPassword === user.password) {
      throw new RecordNotFoundException(NotificationMessage.SUCCESS_STATUS);
    }
    const hashedPassword = await this.authService.hashPassword(
      resetPasswordRequest.newPassword
    );
    user.password = hashedPassword;
    
    await user.save();
    return new ArtisanApiResponse(
      NotificationMessage.PASSWORD_RESET,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async forgotPassword(
    userId: string,
    forgotPasswordRequest: ForgotPasswordRequest
  ): Promise<ArtisanApiResponse> {
    const user = await this.findUserByUsername(userId);
    if (!user) {
      throw new RecordNotFoundException(NotificationMessage.RECORD_NOT_FOUND);
    }
    
    if (forgotPasswordRequest.username === user.username) {
      throw new RecordNotFoundException(NotificationMessage.SUCCESS_STATUS);
    }
    // Update the password
    const hashedPassword = await this.authService.hashPassword(
      forgotPasswordRequest.newPassword
    );
    user.password = hashedPassword;
    await user.save();
    return new ArtisanApiResponse(
      NotificationMessage.FORGOT_PASSWORD,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
}
