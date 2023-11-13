import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Media extends Document {
  @Prop()
  fileName: string;

  @Prop()
  fileType: string;

 

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
