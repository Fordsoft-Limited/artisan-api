import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  username: string;
  @Prop()
  fullName: string;

  @Prop()
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'Contacts', select: '_id name phone email' })
  contact: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Media', select: '_id fileName fileType' })
  media: Types.ObjectId;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop()
  invitationCode: string;

  @Prop({ type: Types.ObjectId, ref: 'User', select: '_id username' })
  createdBy: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
