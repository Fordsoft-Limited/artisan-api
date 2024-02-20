import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class BlogComments extends Document {
  @Prop()
  body: string;

  @Prop({ type: Types.ObjectId, ref: 'Blogs' })
  blogId: Types.ObjectId;

  @Prop()
  createdBy: string;
}

export const BlogCommentsSchema = SchemaFactory.createForClass(BlogComments);
