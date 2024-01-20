import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DuplicateResourceException } from "src/filters/app.custom.exception";
import { GlobalService } from "src/global/database/global.service";
import { Mapper } from "src/mapper/dto.mapper";
import { Advertisement } from "src/model/advertisement.schema";
import { AdvertisementRequest, ArtisanRequest, BlogCreateRequest } from "src/model/app.request.model";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { Artisan } from "src/model/artisan.schema";
import { Blogs } from "src/model/blog.schema";
import { Category } from "src/model/contact.schema";
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
    @InjectModel(Artisan.name) private artisanModel: Model<Artisan>
  ) {}
  
  async addArtisan(loginUser: any, file: Express.Multer.File, data: any): Promise<ArtisanApiResponse> {
    const payloadData:ArtisanRequest =Mapper.parseJson<ArtisanRequest>(data.payload);
    const uploadedFile:string = await this.fileUploadService.uploadFile(file);
    const existingContact = await this.globalService.checkDuplicate({
      ...payloadData,
      willIdReturn: true,
    });
    if(existingContact){
      throw new DuplicateResourceException(NotificationMessage.DUPLICATE_ACCOUNT)
    }
     
    const newArtisan = new this.artisanModel({
      category: Category.Artisan,
      serviceDescription: payloadData.serviceDescription,
      businessName:payloadData.businessName,
      businessType: payloadData.businessType,
      websiteLink: payloadData.websiteLink,
      logo: uploadedFile,
      createdBy: loginUser?.sub
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
    const payloadData: BlogCreateRequest = Mapper.parseJson<BlogCreateRequest>(data.payload);
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
  async addNewAdvertisement(file: Express.Multer.File,data: any): Promise<ArtisanApiResponse> {
  const payloadData:AdvertisementRequest =Mapper.parseJson<AdvertisementRequest>(data.payload);
    const uploadedFile:string = await this.fileUploadService.uploadFile(file)
    const existingContact = await this.globalService.checkDuplicate({
      ...payloadData,
      willIdReturn: true,
    });
     
    const newAdvertisement = new this.advertisementModel({
      category: payloadData.category,
      description: payloadData.description,
      businessName:payloadData.businessName,
      websiteLink: payloadData.websiteLink,
      fileName: uploadedFile
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

 
}
