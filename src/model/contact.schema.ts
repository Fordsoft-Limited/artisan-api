import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Category{
  Artisan = "Artisan",
   Guests = " Guests",
  User = "User"
  
}

@Schema({ timestamps: true })
export class Contacts {
  @Prop()
  category: Category;

  @Prop()
  name: string;

  @Prop()
 phone: string;

 @Prop()
  email: string;

  @Prop()
  street: string;

  @Prop()
  city: string;

  @Prop()
  postalCode: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contacts);


