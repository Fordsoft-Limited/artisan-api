import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Artisan extends Document {
  @Prop()
  businessType: string;

  @Prop()
  rank: number;

  @Prop()
  serviceDescription: string;
  @Prop()
  businessName: string;
  @Prop()
  logo: string;
  @Prop()
  websiteLink: string;

  @Prop({ type: Types.ObjectId, ref: "User" })
  createdBy: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: "Contacts" })
  contact: Types.ObjectId;
}

export const ArtisanSchema = SchemaFactory.createForClass(Artisan);
