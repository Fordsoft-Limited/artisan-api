import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Advertisement extends Document {
  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop()
  websiteLink: string;

  @Prop()
  businessName: string;

  @Prop({ type: Types.ObjectId, ref: 'Contacts' })
  contact: Types.ObjectId;
  
  @Prop({ type: Types.ObjectId, ref: 'Media' })
  media: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const AdvertisementSchema = SchemaFactory.createForClass(Advertisement);
