import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from '~/users/users.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction, TransactionType } from './entities/transaction.entity';
import { TransactionPopulated } from './response.types';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @Inject(forwardRef(() => UsersService))
    private userService: UsersService,
  ) {}

  async getCurrentBalanceByUserId(userId: string) {
    const transactionsIssued = await this.transactionModel.find({
      issuer: userId,
    });
    const transactionsReceived = await this.transactionModel.find({
      destinationUser: userId,
    });

    const totalIssued = await transactionsIssued.reduce(
      (balance, transaction) => {
        return transaction.type === TransactionType.Deposit
          ? balance + transaction.amount
          : balance - transaction.amount;
      },
      0,
    );

    const totalReceived = await transactionsReceived.reduce(
      (balance, transaction) => {
        return balance + transaction.amount;
      },
      0,
    );

    return totalIssued + totalReceived;
  }

  async getByUserId(userId: string) {
    const transactions: TransactionPopulated[] = await this.transactionModel
      .find({
        $or: [{ issuer: userId }, { destinationUser: userId }],
      })
      .sort('created_at')
      .populate('issuer')
      .populate('destinationUser')
      .lean();

    return transactions.map((transaction) => {
      const isIncome =
        (transaction.type === TransactionType.Payment &&
          transaction.destinationUser._id === userId) ||
        transaction.type === TransactionType.Deposit;

      return {
        isIncome,
        ...transaction,
      };
    });
  }

  async create(createTransactionDto: CreateTransactionDto, issuerId: string) {
    const isPayment = createTransactionDto.type === TransactionType.Payment;
    const currentBalance = await this.getCurrentBalanceByUserId(issuerId);

    if (isPayment) {
      const hasEnoughFounds = createTransactionDto.amount <= currentBalance;

      if (!hasEnoughFounds) {
        throw new PreconditionFailedException(
          `Insufficient founds. Your balance is $${currentBalance}`,
        );
      }

      if (currentBalance <= 0) {
        throw new HttpException(
          `Bro. You are broke! Your balance is $${currentBalance} Make a DEPOSIT first`,
          402,
        );
      }

      const user = await this.userService.findOne(
        createTransactionDto.destinationUser,
      );
      if (!user)
        throw new NotFoundException(
          `DestinationUser ${createTransactionDto.destinationUser} not found`,
        );
    }

    const transactionCreated = await this.transactionModel.create(
      {...createTransactionDto, issuer: issuerId}
    );

    const transaction = await this.transactionModel
      .findById(transactionCreated._id)
      .populate('destinationUser')
      .populate('issuer');

    const finalBalance =
      transaction.type === TransactionType.Deposit
        ? currentBalance + transaction.amount
        : currentBalance - transaction.amount;

    return {
      transaction,
      finalBalance,
    };
  }

  async getById(id) {
    const transaction = await this.transactionModel
      .findById(id)
      .populate('destinationUser')
      .populate('issuer');

    if (!transaction) {
      throw new NotFoundException(`Transaction ${id} not found`);
    }

    return transaction;
  }
}
