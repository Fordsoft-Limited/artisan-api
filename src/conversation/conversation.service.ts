import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  DuplicateResourceException,
  RecordNotFoundException,
} from "src/filters/app.custom.exception";
import { GlobalService } from "src/global/database/global.service";
import { Mapper } from "src/mapper/dto.mapper";
import { Advertisement } from "src/model/advertisement.schema";
import {
  AdvertisementRequest,
  ArtisanRequest,
  BlogCreateRequest,
} from "src/model/app.request.model";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { Artisan } from "src/model/artisan.schema";
import { Blogs } from "src/model/blog.schema";
import { Category } from "src/model/contact.schema";
import { Rating } from "src/model/rating.schema";
import { User } from "src/model/user.schema";
import { UploadService } from "src/upload/upload.service";
import { NotificationMessage, ErrorCode } from "src/utils/app.util";

@Injectable()
export class ConversationService {
  constructor(
    private globalService: GlobalService,
    private fileUploadService: UploadService,
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<Advertisement>,
    @InjectModel(Blogs.name) private blogsModel: Model<Blogs>,
    @InjectModel(Artisan.name) private artisanModel: Model<Artisan>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Rating.name) private ratingModel: Model<Rating>
  ) {}

  async addArtisan(
    loginUser: any,
    file: Express.Multer.File,
    data: any
   ): Promise<ArtisanApiResponse> {
    const payloadData: ArtisanRequest = Mapper.parseJson<ArtisanRequest>(
      data.payload
    );
    const uploadedFile: string = await this.fileUploadService.uploadFile(file);
    const existingContact = await this.globalService.checkDuplicate({
      ...payloadData,
      willIdReturn: true,
    });
    if (existingContact) {
      throw new DuplicateResourceException(
        NotificationMessage.DUPLICATE_ACCOUNT
      );
    }

    const newArtisan = new this.artisanModel({
      category: Category.Artisan,
      serviceDescription: payloadData.serviceDescription,
      businessName: payloadData.businessName,
      businessType: payloadData.businessType,
      websiteLink: payloadData.websiteLink,
      logo: uploadedFile,
      createdBy: loginUser?.sub,
    });
    newArtisan.contact = existingContact
      ? existingContact
      : await this.globalService.createContact({
          ...payloadData,
          category: Category.Artisan,
        });

    await newArtisan.save();
    return new ArtisanApiResponse(
      NotificationMessage.ARTISAN_SAVED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
  async addNewBlog(
    loginUser: any,
    file: Express.Multer.File,
    data: any
  ): Promise<ArtisanApiResponse> {
    const payloadData: BlogCreateRequest = Mapper.parseJson<BlogCreateRequest>(
      data.payload
    );
    const uploadedFile: string = await this.fileUploadService.uploadFile(file);
    const newBlog = new this.blogsModel({
      ...payloadData,
      mediaName: uploadedFile,
      author: loginUser.sub,
    });
    await newBlog.save();

    return new ArtisanApiResponse(
      NotificationMessage.BLOG_PUBLISHED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
  async addNewAdvertisement(
    file: Express.Multer.File,
    data: any
  ): Promise<ArtisanApiResponse> {
    const payloadData: AdvertisementRequest =
      Mapper.parseJson<AdvertisementRequest>(data.payload);
    const uploadedFile: string = await this.fileUploadService.uploadFile(file);
    const existingContact = await this.globalService.checkDuplicate({
      ...payloadData,
      willIdReturn: true,
    });

    const newAdvertisement = new this.advertisementModel({
      category: payloadData.category,
      description: payloadData.description,
      businessName: payloadData.businessName,
      websiteLink: payloadData.websiteLink,
      fileName: uploadedFile,
    });
    newAdvertisement.contact = existingContact
      ? existingContact
      : await this.globalService.createContact({
          ...payloadData,
          category: Category.Artisan,
        });

    await newAdvertisement.save();

    return new ArtisanApiResponse(
      NotificationMessage.ADVERTISEMENT_SAVED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async deleteBlog(id: string): Promise<ArtisanApiResponse> {
    const blog = await this.blogsModel.findById(id);
    if (!blog)
      throw new RecordNotFoundException(`Blog with ID ${id} not found`);
    await this.blogsModel.findByIdAndDelete(id);
    return new ArtisanApiResponse(
      NotificationMessage.BLOG_DELETED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async deleteArtisan(id: string): Promise<ArtisanApiResponse> {
    const artisan = await this.artisanModel.findById(id);
    if (!artisan)
      throw new RecordNotFoundException(`Artisan with ID ${id} not found`);
    await this.artisanModel.findByIdAndDelete(id);
    await this.ratingModel.deleteMany({ artisanId: id });
    return new ArtisanApiResponse(
      NotificationMessage.ARTISAN_DELETED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async deleteAdvertisement(id: string): Promise<ArtisanApiResponse> {
    const advertisement = await this.advertisementModel.findById(id);
    if (!advertisement)
      throw new RecordNotFoundException(
        `Advertisement with ID ${id} not found`
      );
    await this.advertisementModel.findByIdAndDelete(id);
    return new ArtisanApiResponse(
      NotificationMessage.ADVERISEMENT_DELETED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async deleteVisitor(id: string): Promise<ArtisanApiResponse> {
    const visitor = await this.userModel.findById(id);
    if (!visitor)
      throw new RecordNotFoundException(`Vistor with ID ${id} not found`);
    await this.userModel.findByIdAndDelete(id);
    return new ArtisanApiResponse(
      NotificationMessage.VISITOR_DELETED,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }

  async updateArtisan(
    id: string,
    payload: ArtisanRequest
  ): Promise<ArtisanApiResponse> {
    const existingArtisan = await this.artisanModel.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!existingArtisan) {
      return new ArtisanApiResponse(
        NotificationMessage.ARTISAN_NOT_FOUND,
        NotificationMessage.FAIL_STATUS,
        ErrorCode.HTTP_404
      );
    }
    Object.assign(existingArtisan, payload);
    const updatedArtisan = await existingArtisan.save();
    const artisanResponse = Mapper.mapToArtisanResponse(updatedArtisan);
    return new ArtisanApiResponse(
      artisanResponse,
      NotificationMessage.UPDATE_ARTISAN_SUCCESS,
      ErrorCode.HTTP_200
    );
  }

  async updateBlog(
    id: string,
    payload: BlogCreateRequest
  ): Promise<ArtisanApiResponse> {
    const existingBlog = await this.blogsModel.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!existingBlog) {
      return new ArtisanApiResponse(
        NotificationMessage.BLOG_NOT_FOUND,
        NotificationMessage.FAIL_STATUS,
        ErrorCode.HTTP_404
      );
    }
    Object.assign(existingBlog, payload);
    const updatedBlog = await existingBlog.save();
    const blogResponse = Mapper.mapToBlogs(updatedBlog);
    return new ArtisanApiResponse(
      blogResponse,
      NotificationMessage.UPDATE_BLOG_SUCCESS,
      ErrorCode.HTTP_200
    );
  }

  async updateAdvertisement(
    id: string,
    payload: AdvertisementRequest
  ): Promise<ArtisanApiResponse> {
    const existingAdvert = await this.advertisementModel.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!existingAdvert) {
      return new ArtisanApiResponse(
        NotificationMessage.ADVERTISEMENT_NOT_FOUND,
        NotificationMessage.FAIL_STATUS,
        ErrorCode.HTTP_404
      );
    }
    Object.assign(existingAdvert, payload);
    const updatedAdvert = await existingAdvert.save();
    const advertResponse = Mapper.mapToAdvertisementResponse(updatedAdvert);
    return new ArtisanApiResponse(
      advertResponse,
      NotificationMessage.UPDATE_ADVERTISEMENT_SUCCESS,
      ErrorCode.HTTP_200
    );
  }
}
