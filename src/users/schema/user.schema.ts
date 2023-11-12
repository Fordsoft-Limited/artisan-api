import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop()
  contact: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isBlocked: boolean;

  @Prop()
  invitationCode: string;


  @Prop()
  media: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  createdBy: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
