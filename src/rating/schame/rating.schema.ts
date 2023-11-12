import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Rating extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Artisan' })
  artisanId: Types.ObjectId;

  @Prop()
  rate: number;

  @Prop({ default: Date.now })
  dateCreated: Date;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
