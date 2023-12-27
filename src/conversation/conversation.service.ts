import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntranceService } from "src/entrance/entrance.service";
import { RecordNotFoundException } from "src/filters/app.custom.exception";
import { Mapper } from "src/mapper/dto.mapper";
import { Advertisement } from "src/model/advertisement.schema";
import { AdvertisementRequest, BlogCreateRequest } from "src/model/app.request.model";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { Blogs } from "src/model/blog.schema";
import { Category } from "src/model/contact.schema";
import { NotificationMessage, ErrorCode } from "src/utils/app.util";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";

@Injectable()
export class ConversationService {
  constructor(
    private entranceService: EntranceService,
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<Advertisement>,
    @InjectModel(Blogs.name) private blogModel: Model<Blogs>,
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

   async addNewBlog(payload: BlogCreateRequest): Promise<ArtisanApiResponse> {
    // Create a new Advertisement instance
    const newBlog = new this.blogModel({
      description: payload.description,
      title: payload.title, 
    });
    // Save the new Advertisement
    await newBlog.save();
    return new ArtisanApiResponse(
      NotificationMessage.BLOG_SAVED,
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
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      blog,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }


  async updateAdvertisement(id: string, payload: AdvertisementRequest): Promise<ArtisanApiResponse> {
    // Use findByIdAndUpdate to update the document and get the modified document
  const updatedAdvertisement = await this.advertisementModel.findByIdAndUpdate(id, payload, {
    new: true,  // Return the modified document
    runValidators: true  // Run validation on the update
  });

  if (!updatedAdvertisement) {
      // Handle case when the user with the provided ID is not found
      throw new RecordNotFoundException(
        NotificationMessage.RECORD_NOT_FOUND
      );
    }

  return new ArtisanApiResponse(
    NotificationMessage.UPDATE_ADVERTISEMENT,
    NotificationMessage.SUCCESS_STATUS,
    ErrorCode.HTTP_200
  );
  }


}
