import { ContactMethod } from "./guest.schema";

export class VisitorRequest {
    reasonForVisit: string;
    methodOfContact: ContactMethod;
    numberOfVisit: number;
    name: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    postalCode: string;
  
    constructor(
      reasonForVisit: string,
      methodOfContact: ContactMethod,
      numberOfVisit: number,
      name: string,
      phone: string,
      email: string,
      street: string,
      city: string,
      postalCode: string
    ) {
      this.reasonForVisit = reasonForVisit;
      this.methodOfContact = methodOfContact;
      this.numberOfVisit = numberOfVisit;
      this.name = name;
      this.phone = phone;
      this.email = email;
      this.street = street;
      this.city = city;
      this.postalCode = postalCode;
    }
  }