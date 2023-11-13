import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ timestamps: true })


export class Guests {
  @Prop()
  reasonForVisit: string;

  @Prop()
  methodOfContact: string;

  @Prop()
 numberOfVisit: number;

 @Prop()
  contact: string;
}

export const GuestSchema = SchemaFactory.createForClass(Guests);


