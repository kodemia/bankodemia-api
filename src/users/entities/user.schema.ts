import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export const identityImageTypes = [
  'INE',
  'PASSPORT',
  'MIGRATION_FORM',
] as const;

export type UserDocument = User & Document;
export type IdentityImageType = typeof identityImageTypes[number];

@Schema()
export class User {
  @ApiProperty({ readOnly: true })
  _id: string; // check

  @ApiProperty({
    description: 'Should be unique',
    example: 'koder@kodemia.mx',
  })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: 'John', description: 'User name' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'Doe', description: 'User lastname' })
  @Prop({ required: true })
  lastName: string;

  @ApiProperty({ example: 'Software Magician', description: 'User occupation' })
  @Prop({ select: false })
  occupation?: string;

  @ApiProperty({ example: '1995-11-04', description: 'User birthdate' })
  @Prop({ required: true, select: false })
  birthDate: Date;

  @ApiProperty({ example: 'BondJames007', description: 'User password' })
  @Prop({ required: true, select: false })
  password: string;

  @ApiProperty({
    description: 'Phone with country code, Should be unique',
    example: '+525577111588',
  })
  @Prop({ required: true, select: false })
  phone: string;

  @ApiProperty({ readOnly: true })
  @Prop({ default: false, select: false })
  isPhoneVerified: boolean;

  @ApiHideProperty()
  @Prop({ select: false })
  phoneVerificationCode: string;

  @ApiProperty({
    description: 'Base64 image string',
    example: 'iVBORw0KGgoAAAANSUhEUg...',
  })
  @Prop({ required: true, select: false })
  identityImage: string;

  @ApiProperty({
    example: identityImageTypes[0],
    enum: identityImageTypes,
  })
  @Prop({ enum: identityImageTypes, select: false })
  identityImageType: IdentityImageType;
}

export const UserSchema = SchemaFactory.createForClass(User);
