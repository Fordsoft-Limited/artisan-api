import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from 'mongoose';
import { BlogComments, BlogCommentsSchema } from "./comments.schema";


@Schema({
  timestamps: true
})
export class Blogs extends Document{

  @Prop()
  description: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
  author: Types.ObjectId;

  @Prop()
  title: string;

  @Prop()
  mediaName: string;
  @Prop({ type: [BlogCommentsSchema], default: [] })
  comments: BlogComments[];
  
  @Prop()
  commentCount:number;
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs)