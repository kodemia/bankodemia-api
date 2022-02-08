import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export const identityImageTypes = [ 'ine', 'passport', 'migration-form' ] as const

export type UserDocument = User & Document;
export type IdentityImageType = typeof identityImageTypes[number]

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

  @Prop()
  phoneVerificationCode: string

  @Prop()
  identityImage: string

  @Prop({ enum: identityImageTypes })
  identityImageType: IdentityImageType
}

export const UserSchema = SchemaFactory.createForClass(User);