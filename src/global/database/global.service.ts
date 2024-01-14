import { Global, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DuplicateResourceException } from "src/filters/app.custom.exception";
import { Contacts } from "src/model/contact.schema";
import { NotificationMessage } from "src/utils/app.util";

@Injectable()
export class GlobalService {
  constructor(
    @InjectModel(Contacts.name) private contactsModel: Model<Contacts>
  ) {}

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
}
