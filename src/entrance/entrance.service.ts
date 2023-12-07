import { Injectable } from "@nestjs/common";
import { LoginRequest, LoginResponse } from "./model/login.model";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";
import { ArtisanApiResponse } from "src/model/app.response.model";
import {
  AccountActivationRequest,
  VisitorRequest,
} from "src/model/app.request.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Category, Contacts } from "src/model/contact.schema";
import { Guests } from "src/model/guest.schema";
import { DuplicateResourceException } from "src/filters/app.custom.exception";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";
import { AuthService } from "src/auth/auth.service";
import { Advertisement } from "src/model/advertisement.schema";

@Injectable()
export class EntranceService {
  constructor(
    private authService: AuthService,
    @InjectModel(Guests.name) private guestsModel: Model<Guests>,
    @InjectModel(Contacts.name) private contactsModel: Model<Contacts>,
  ) {}

  async activateAccount(
    payload: AccountActivationRequest
  ): Promise<ArtisanApiResponse> {
    return await this.authService.activateAccount(payload);
  }
  async login(login: LoginRequest): Promise<ArtisanApiResponse> {
   return await this.authService.validateLoginUser(login);
  }
  async checkDuplicate({ email, phone, willIdReturn }): Promise<Contacts> {
    // Check if a contact with the same email or phone already exists
    const existingContact = await this.contactsModel.findOne({
      $or: [{ email: email }, { phone: phone }],
    });

    if (existingContact && !willIdReturn) {
      // If a contact with the same email or phone already exists, throw a conflict exception
      throw new DuplicateResourceException(
        NotificationMessage.DUPLICATE_ACCOUNT
      );
    } else {
      return existingContact;
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

  async createVisitRequest(
    visitorRequest: VisitorRequest
  ): Promise<ArtisanApiResponse> {
    await this.checkDuplicate({ ...visitorRequest, willIdReturn: false });
    // Create a new contact
    const savedContact = await this.createContact({
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
