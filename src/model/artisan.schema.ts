import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Artisan extends Document {
  @Prop()
  businessType: string;

  @Prop()
  contact: string;

  @Prop()
  rank: number;

  @Prop()
  serviceDescription: string;


  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const ArtisanSchema = SchemaFactory.createForClass(Artisan);
