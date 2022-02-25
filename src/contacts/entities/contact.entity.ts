
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '~/users/entities/user.schema';

export type TransactionDocument = Contact & Document;

@Schema()
export class Contact extends Document {
  @ApiProperty({
    description: 'Short name to easy identify your contact',
    type: String,
    example: 'Compadre Luis'
  })
  @Prop()
  shortName: string

  @ApiProperty({
    description: 'Contact owner (UserID)',
    readOnly: true,
    type: String
  })
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User'
  })
  owner: string
  
  @ApiProperty({
    description: 'Contact (UserID)',
    type: String
  })
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User'
  })
  user: string
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
