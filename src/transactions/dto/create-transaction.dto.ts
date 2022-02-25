import { OmitType } from '@nestjs/swagger';
import {
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import {
  Transaction,
  TransactionType,
  TransactionTypes,
} from '~/transactions/entities/transaction.entity';

export class CreateTransactionDto extends OmitType(Transaction, ['issuer', 'created_at']) {
  @IsPositive()
  @IsNumber()
  amount: number;

  @IsIn(TransactionTypes)
  type: TransactionType;

  @IsOptional()
  @IsMongoId()
  destinationUser: string;

  @IsNotEmpty()
  @IsString()
  concept: string;
}
