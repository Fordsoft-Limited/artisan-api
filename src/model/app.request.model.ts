import { ContactMethod } from "./guest.schema";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { IsPhoneNumber } from "../validators/phone-validation.decorator";

export class BaseRequest {
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

  constructor(name: string, phone: string, email: string) {
    this.name = name;
    this.phone = phone;
    this.email = email;
  }
}

export class VisitorRequest extends BaseRequest{
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
    super(name, phone, email)
    this.reasonForVisit = reasonForVisit;
    this.methodOfContact = methodOfContact;
    this.street = street;
    this.city = city;
    this.postalCode = postalCode;
  }
}

export class UserInvitationRequest extends BaseRequest{
}

export class AdvertisementRequest extends BaseRequest{
  @ApiProperty()
  @IsNotEmpty()
  category: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  websiteLink: string;
  @ApiProperty()
  @IsNotEmpty()
  businessName: string;
  @ApiProperty()
  street: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  postalCode: string;
}


export class AccountActivationRequest{
  @ApiProperty()
  @IsNotEmpty()
  invitationCode: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class BlogCreateRequest{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsOptional()
  @IsObject()
  file: Express.Multer.File;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isBlocked: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  invitationCode: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roles: string;
    
}