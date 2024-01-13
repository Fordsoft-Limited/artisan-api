import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { EntranceService } from "src/entrance/entrance.service";
import { Mapper } from "src/mapper/dto.mapper";
import { Advertisement } from "src/model/advertisement.schema";
import { AdvertisementRequest } from "src/model/app.request.model";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { Category } from "src/model/contact.schema";
import { UploadService } from "src/upload/upload.service";
import { NotificationMessage, ErrorCode } from "src/utils/app.util";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";

@Injectable()
export class ConversationService {
  constructor(
    private entranceService: EntranceService,
    private fileUploadService: UploadService,
    @InjectModel(Advertisement.name)
    private advertisementModel: Model<Advertisement>
  ) {}

  async addNewAdvertisement(file: Express.Multer.File,data: any): Promise<ArtisanApiResponse> {
  const payloadData:AdvertisementRequest =JSON.parse(data.payload) as AdvertisementRequest
    const uploadedFile:string = await this.fileUploadService.uploadFile(file)
    const existingContact = await this.entranceService.checkDuplicate({
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
  console.log("The object to save is:::::::", newAdvertisement)
    // Set the contact based on whether it already exists or not
    newAdvertisement.contact = existingContact
      ? existingContact
      : await this.entranceService.createContact({
          ...payloadData,
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
}
