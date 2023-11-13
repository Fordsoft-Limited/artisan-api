import { Injectable } from "@nestjs/common";
import { LoginRequest, LoginResponse } from "./model/login.model";
import { ErrorCode, NotificationMessage } from "src/utils/app.util";
import { ArtisanApiResponse } from "src/model/app.response.model";
import { VisitorRequest } from "src/model/app.request.model";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Contacts } from "src/model/contact.schema";
import { Guests } from "src/model/guest.schema";
import { DuplicateResourceException } from "src/filters/conflict.exception";
import { DEFAULT_PAGE, DEFAULT_SIZE } from "src/utils/constants";

@Injectable()
export class EntranceService {
  constructor(
    @InjectModel(Guests.name) private guestsModel: Model<Guests>,
    @InjectModel(Contacts.name) private contactsModel: Model<Contacts>
  ) {}

  async login(login: LoginRequest): Promise<ArtisanApiResponse> {
    return new ArtisanApiResponse(
      new LoginResponse("admin", "test", "test", "Oyejide", "Odofin"),
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
  async createVisitRequest(
    visitorRequest: VisitorRequest
  ): Promise<ArtisanApiResponse> {
    // Check if a contact with the same email or phone already exists
    const existingContact = await this.contactsModel.findOne({
      $or: [{ email: visitorRequest.email }, { phone: visitorRequest.phone }],
    });

    if (existingContact) {
      // If a contact with the same email or phone already exists, throw a conflict exception
      throw new DuplicateResourceException(
        NotificationMessage.DUPLICATE_ACCOUNT
      );
    }

    // Create a new contact
    const newContact = new this.contactsModel({
      category: visitorRequest.methodOfContact,
      name: visitorRequest.name,
      phone: visitorRequest.phone,
      email: visitorRequest.email,
      street: visitorRequest.street,
      city: visitorRequest.city,
      postalCode: visitorRequest.postalCode,
    });

    // Save the new contact
    const savedContact = await newContact.save();

    // Create a new guests document with the reference to the contact
    const newGuest = new this.guestsModel({
      reasonForVisit: visitorRequest.reasonForVisit,
      methodOfContact: visitorRequest.methodOfContact,
      numberOfVisit: visitorRequest.numberOfVisit,
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
  async getPaginatedVisitors(
    page: number = DEFAULT_PAGE,
    limit: number = DEFAULT_SIZE
  ): Promise<ArtisanApiResponse> {
    const skip = (page - 1) * limit;

    const visitors = await this.guestsModel
      .find()
      .populate({
        path: "contact",
      })
      .skip(skip)
      .limit(limit)
      .exec();

    return new ArtisanApiResponse(
      visitors,
      NotificationMessage.SUCCESS_STATUS,
      ErrorCode.HTTP_200
    );
  }
}
