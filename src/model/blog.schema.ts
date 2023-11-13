import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from 'mongoose';


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
  Media: string;
}

export const BlogsSchema = SchemaFactory.createForClass(Blogs)