import { ContactMethod } from "./guest.schema";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsPhoneNumber } from "../validators/phone-validation.decorator";
export class VisitorRequest {
  @ApiProperty()
  @IsNotEmpty()
  reasonForVisit: string;
  @ApiProperty()
  @IsNotEmpty()
  methodOfContact: ContactMethod;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  street: string;
  @ApiProperty()
  @IsNotEmpty()
  city: string;
  @ApiProperty()
  postalCode: string;

  constructor(
    reasonForVisit: string,
    methodOfContact: ContactMethod,
    name: string,
    phone: string,
    email: string,
    street: string,
    city: string,
    postalCode: string
  ) {
    this.reasonForVisit = reasonForVisit;
    this.methodOfContact = methodOfContact;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
  }
}
