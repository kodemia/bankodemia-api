import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '~/users/entities/user.schema';

export const TransactionTypes = ['DEPOSIT', 'PAYMENT'];
export enum TransactionType {
  Deposit = 'DEPOSIT',
  Payment = 'PAYMENT',
}

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @ApiProperty({ readOnly: true })
  _id: string;

  @ApiProperty({
    type: Number,
    description: 'Transaction amount',
    example: 500,
  })
  @Prop({ required: true })
  amount: number;

  @ApiProperty({
    required: true,
    enum: TransactionType,
    type: String,
    description: 'Whether the transaction is a `DEPOSIT` or a `PAYMENT`',
    example: TransactionType.Deposit,
  })
  @Prop({
    required: true,
    enum: TransactionType,
    type: String,
  })
  type: TransactionType;

  @ApiProperty({
    readOnly: true,
    type: String,
    description: 'Issuer user',
  })
  @Prop({
    required: true,
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
  })
  issuer: string;

  @ApiProperty({
    type: String,
    description: 'Destination User id, required when type is `PAYMENT`',
    example: '6204409a5696f4000da56098',
  })
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    required: function () {
      console.log('this.type: ', this.type);
      return this.type === TransactionType.Payment;
    },
  })
  destinationUser: string;

  @ApiProperty({
    type: String,
    description: 'Transaction concept',
    example: 'Orden de tacos',
  })
  @Prop({ required: true })
  concept: string;

  @ApiProperty({
    type: Date,
    readOnly: true,
    description: 'Creation date',
  })
  @Prop({
    type: Date,
    default: () => new Date(),
  })
  created_at: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

export class GetByIdParams {
  @IsMongoId()
  id: string;
}
