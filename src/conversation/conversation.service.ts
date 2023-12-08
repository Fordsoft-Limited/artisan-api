import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntranceService } from "src/entrance/entrance.service";
import { DuplicateResourceException } from "src/filters/app.custom.exception";
import { Mapper } from "src/mapper/dto.mapper";
import { Advertisement } from "src/model/advertisement.schema";
import { AdvertisementRequest, BlogCreateRequest } from "src/model/app.request.model";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { Blogs} from "src/model/blog.schema";
import { Category } from "src/model/contact.schema";
import { User } from "src/model/user.schema";
import { NotificationMessage, ErrorCode } from "src/utils/app.util";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";

@Injectable()
export class ConversationService {
  constructor(
    private entranceService: EntranceService,
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<Advertisement>,
    @InjectModel(Blogs.name) private blogModel: Model<Blogs>,
    @InjectModel(User.name) private UserModel: Model<User>
  ) {}

  async addNewAdvertisement(payload: AdvertisementRequest): Promise<ArtisanApiResponse> {
    // Check for existing contact
    const existingContact = await this.entranceService.checkDuplicate({
      ...payload,
      willIdReturn: true,
    });
  
    // Create a new Advertisement instance
    const newAdvertisement = new this.advertisementModel({
      category: payload.category,
      description: payload.description,
      businessName: payload.businessName,
      websiteLink: payload.websiteLink,
    });
  
    // Set the contact based on whether it already exists or not
    newAdvertisement.contact = existingContact
      ? existingContact
      : await this.entranceService.createContact({
          ...payload,
          category: Category.Artisan,
        });
  
    // Save the new Advertisement
    await newAdvertisement.save();
  
    return new ArtisanApiResponse(
      NotificationMessage.ADVERTISEMENT_SAVED,
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
      advertisement.map(advertisement=>Mapper.mapToAdvertisementResponse(advertisement)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

 async checkBlogDuplicate({ username, willIdReturn }): Promise<User> {
    // Check if a blog with the same username already exists
    const existingBlog = await this.UserModel.findOne({username: username});

    if (existingBlog && !willIdReturn) {
      // If a Blog with the username already exists, throw a conflict exception
      throw new DuplicateResourceException(
        NotificationMessage.DUPLICATE_BLOG
      );
    } else {
      return existingBlog;
    }
  }

   public async createBlog({ 
    username,
    isActive,
    isBlocked,
    invitationCode,
    roles = "NA",
    
  }: {
    username: string;
    isActive: boolean;
    isBlocked: boolean;
    invitationCode: string;
    roles?: string;
   
  }): Promise<any> {
    const newBlog = new this.blogModel({
      username,
      isActive,
      isBlocked,
      invitationCode,
      roles,
      
    });

    // Save the new contact and return it
    return await newBlog.save();
  }

  async createNewBlog(
    payload: BlogCreateRequest
  ): Promise<ArtisanApiResponse> {
    await this.checkBlogDuplicate({ ...payload, willIdReturn: true });
    // Create a new contact
    const savedBlog = await this.createBlog({...payload})

    // Create a new guests document with the reference to the contact
    const newBlog = new this.blogModel({
      description: payload.description,
      title: payload.title,
      user: savedBlog._id,
    });

    // Save the new Blog document
    await newBlog.save();
    // Return a success response
    return new ArtisanApiResponse(
      NotificationMessage.VISITOR_FORM_SUBMITTED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async listPaginatedBlog(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const blog = await this.blogModel
      .find()
      .populate({
        path: "author",
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      blog.map(blog=>Mapper.mapToBlogResponse(blog)),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async getPaginatedBlog(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const blog = await this.blogModel
      .find()
      .populate({
        path: "author",
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      blog,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  
}
