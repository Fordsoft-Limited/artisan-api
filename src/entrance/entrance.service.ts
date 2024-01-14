import { Injectable } from "@nestjs/common";
import { LoginRequest } from "./model/login.model";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";
import { ArtisanApiResponse } from "src/model/app.response.model";
import {
  AccountActivationRequest,
  VisitorRequest,
} from "src/model/app.request.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category } from "src/model/contact.schema";
import { Guests } from "src/model/guest.schema";
import { AuthService } from "src/auth/auth.service";
import { GlobalService } from "src/global/database/global.service";

@Injectable()
export class EntranceService {
  constructor(
    private authService: AuthService,
    private globalService: GlobalService,
    @InjectModel(Guests.name) private guestsModel: Model<Guests>,
   
  ) {}

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
    await this.globalService.checkDuplicate({ ...visitorRequest, willIdReturn: false });
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
  

  
}
