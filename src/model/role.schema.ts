import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Role extends Document {
  @Prop()
  useId: string;

  @Prop()
  roleName: string;

}

export const RoleSchema = SchemaFactory.createForClass(Role);