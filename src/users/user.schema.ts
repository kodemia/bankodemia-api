import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string; // check

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastName: string;

  @Prop()
  occupation?: string

  @Prop({ required: true })
  birthDate: Date

  @Prop({ required: true })
  password: string

  @Prop({ required: true })
  phone: string

  @Prop({ default: false })
  isPhoneVerified: boolean

  @Prop({ required: true })
  phoneVerificationCode: string
}

export const UserSchema = SchemaFactory.createForClass(User);