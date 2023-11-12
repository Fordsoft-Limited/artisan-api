import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Service extends Document {
  @Prop()
  media: string;

  @Prop({ type: Types.ObjectId, ref: 'Artisan' })
  artisanId: Types.ObjectId;

  
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
