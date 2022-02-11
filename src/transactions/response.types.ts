import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ControllerResponse, ErrorResponse } from '~/types/response.type';
import { User } from '~/users/entities/user.schema';
import { Transaction } from './entities/transaction.entity';

export class TransactionPopulated extends OmitType(Transaction, [
  'issuer',
  'destinationUser',
]) {
  @ApiProperty({
    type: () => User,
    description: 'User who made the transaction',
  })
  issuer: User;

  @ApiProperty({
    type: () => User,
    description: 'User who received the money when transaction is type PAYMENT',
  })
  destinationUser: User;

  @ApiProperty({
    type: Boolean,
    description: 'Is income for the user',
    readOnly: true,
  })
  isIncome: boolean;
}

class TransactionCreatedData {
  @ApiProperty({
    description: 'Transaction created',
    type: TransactionPopulated,
  })
  transaction: TransactionPopulated;

  @ApiProperty({
    description: 'Final balance after transaction',
    example: 500,
  })
  finalBalance: number;
}

class TransactionsListData {
  @ApiProperty({
    isArray: true,
    description: 'Transactions',
    type: TransactionPopulated,
  })
  transactions: TransactionPopulated;

  @ApiProperty({
    description: 'Balance',
    example: 500,
  })
  balance: number;
}

class SingleTransactionData {
  @ApiProperty({
    type: TransactionPopulated,
    description: 'Transaction',
  })
  transaction: TransactionPopulated;
}

class MultipleTransactionData {
  @ApiProperty({
    isArray: true,
    type: TransactionPopulated,
    description: 'Transactions ordered by ´created_at´ date',
  })
  transactions: TransactionPopulated[];
}

export class PaymentRequestExceptionResponse extends ErrorResponse {
  @ApiProperty({ example: 402 })
  statusCode: number;

  @ApiProperty({ example: 'Bro. You are broke!' })
  message: string;

  @ApiProperty({ example: 'Precondition failed' })
  error: string;
}

export class PreconditionFailedExceptionResponse extends ErrorResponse {
  @ApiProperty({ example: 412 })
  statusCode: number;

  @ApiProperty({ example: 'Insufficient founds' })
  message: string;

  @ApiProperty({ example: 'Precondition failed' })
  error: string;
}

export class TransactionCreatedResponse extends ControllerResponse {
  @ApiProperty({
    description: 'Transaction created data',
    type: TransactionCreatedData,
  })
  data: TransactionCreatedData;
}

export class SingleTransactionResponse extends ControllerResponse {
  @ApiProperty({
    description: 'Transaction',
    type: SingleTransactionData,
  })
  data: SingleTransactionData;
}

export class MultipleTransactionResponse extends ControllerResponse {
  @ApiProperty({
    description: 'Transactions',
    type: MultipleTransactionData,
  })
  data: MultipleTransactionData;
}

export class GetTransactionsResponse extends ControllerResponse {
  @ApiProperty({
    description: 'Transactions',
    type: TransactionsListData,
  })
  data: TransactionsListData;
}
