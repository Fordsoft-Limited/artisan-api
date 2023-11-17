import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { EntranceService } from 'src/entrance/entrance.service';
import { Advertisement } from 'src/model/advertisement.schema';
import { AdvertisementRequest } from 'src/model/app.request.model';
import { ArtisanApiResponse } from 'src/model/app.response.model';
import { Category, Contacts } from 'src/model/contact.schema';
import { NotificationMessage, ErrorCode } from 'src/utils/app.util';

@Injectable()
export class ConversationService {

    constructor(private entranceService: EntranceService,
        @InjectModel(Advertisement.name) private advertisementModel: Model<Advertisement>,
        @InjectModel(Contacts.name) private contactsModel: Model<Contacts>){}


        async addNewAdvertisement(payload: AdvertisementRequest): Promise<ArtisanApiResponse>{
          const existingContact=  await this.entranceService.checkDuplicate({...payload,willIdReturn:true});
          if(existingContact != null){
            const newAdvertismentwithContactId = new this.advertisementModel({
              category: payload.category,
              description: payload.description,
              businessName: payload.businessName,
              websiteLink: payload.websiteLink,
              contact: existingContact,
            });
            await newAdvertismentwithContactId.save();
            return new ArtisanApiResponse(
              NotificationMessage.ADVERTISEMENT_SAVED,
              NotificationMessage.SUCCESS_STATUS,
              ErrorCode.HTTP_200
            );
          }else{
              const newAdvertisment = this.createAdvertisementRequest(payload)
              return newAdvertisment;
            
          }
       
        }
        public async createContact({
          category,
          name,
          phone,
          email,
          street = "NA",
          city = "NA",
          postalCode = "NA",
        }: {
          category: string;
          name: string;
          phone: string;
          email: string;
          street?: string;
          city?: string;
          postalCode?: string;
        }): Promise<any> {
          const newContact = new this.contactsModel({
            category,
            name,
            phone,
            email,
            street,
            city,
            postalCode,
          });
      
          // Save the new contact and return it
          return await newContact.save();
        }
      
        async createAdvertisementRequest(
          advertismentRequest: AdvertisementRequest
        ): Promise<ArtisanApiResponse> {
          // Create a new contact
          const savedContact = await this.createContact({
            ...advertismentRequest,
            category: Category.Artisan,
          });
      
          // Create a new advertisement  with the reference to the contact
          const newAdvertisment = new this.advertisementModel({
            category: advertismentRequest.category,
            description: advertismentRequest.description,
            businessName: advertismentRequest.businessName,
            websiteLink: advertismentRequest.websiteLink,
            contact: savedContact._id,
          });
      
          // Save the new advertisement
          await newAdvertisment.save();
          // Return a success response
          return new ArtisanApiResponse(
            NotificationMessage.ADVERTISEMENT_SAVED,
            NotificationMessage.SUCCESS_STATUS,
            ErrorCode.HTTP_200
          );
      }


      async findAll(): Promise<ArtisanApiResponse>{
       await this.advertisementModel.find()
       return new ArtisanApiResponse(
         NotificationMessage.ADVERTISEMENT_RETRIEVE,
            NotificationMessage.SUCCESS_STATUS,
            ErrorCode.HTTP_200
       ) 
      }



    async getAdvertisementById(advertisementId: string): Promise<ArtisanApiResponse>{

    const isValidId = mongoose.isValidObjectId(advertisementId)

    if(!isValidId){
      throw new BadRequestException(NotificationMessage.ENTER_CORRECT_ID)
    }
    const advertisement = await this.advertisementModel.findById(advertisementId)
    
    if(!advertisement){
      throw new NotFoundException(NotificationMessage.RECORD_NOT_FOUND)
    }

    return new ArtisanApiResponse(
      NotificationMessage.ADVERTISEMENT_RETRIEVE,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    )
  }   
}