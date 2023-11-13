import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


export enum ContactMethod{
  PHONE = "Phone",
   EMAIL = " Email"
  
}

@Schema({ timestamps: true })
export class Guests {
  @Prop()
  reasonForVisit: string;

  @Prop()
  methodOfContact: ContactMethod;

  @Prop()
 numberOfVisit: number;

 @Prop({ type: Types.ObjectId, ref: 'Contacts', select: '_id name phone email street city postalCode' })
 contact: Types.ObjectId;

}

export const GuestSchema = SchemaFactory.createForClass(Guests);


