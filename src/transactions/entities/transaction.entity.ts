
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '~/users/entities/user.schema';

export enum TransactionType {
  Deposit = 'DEPOSIT',
  Payment = 'PAYMENT'
}

@Schema()
export class Transaction extends Document {
  @ApiProperty({ readOnly: true })
  _id: string

  @ApiProperty({
    type: Number,
    description: 'Transaction amount',
    example: 500
  })
  @Prop({ required: true })
  amount: number

  @ApiProperty({
    required: true,
    enum: TransactionType,
    type: String,
    description: 'Whether the transaction is a `DEPOSIT` or a `PAYMENT`',
    example: TransactionType.Deposit
  })
  @Prop({ 
    required: true,
    enum: TransactionType,
    type: String
  })
  type: TransactionType

  @ApiProperty({
    readOnly: true,
    type: String
  })
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User'
  })
  issuer: User

  @ApiProperty({
    type: String,
    description: 'Destination User id, required when type is `PAYMENT`',
    example: '6204409a5696f4000da56098'
  })
  @Prop({
    type: String,
    ref: 'User',
    required: function () {
      console.log('this.type: ', this.type)
      return this.type === TransactionType.Payment 
    }
  })
  @Prop()
  destinationUser: User

  @ApiProperty({
    type: Date,
    readOnly: true
  })
  @Prop({
    type: Date,
    default: () => new Date()
  })
  created_at: Date
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
