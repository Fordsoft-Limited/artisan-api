import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Types } from 'mongoose';


@Schema({
  timestamps: true
})

export class Setting extends Document{

  @Prop()
  name: string;

  @Prop()
  category: string;

  @Prop()
  description: string;

   @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User"})
  createdBy: Types.ObjectId;

}

export const SettingSchema = SchemaFactory.createForClass(Setting)