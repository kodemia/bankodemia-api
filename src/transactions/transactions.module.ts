import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { UsersModule } from '~/users/users.module';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService
  ],
  imports: [
    MongooseModule.forFeature([
      { 
        name: Transaction.name,
        schema: TransactionSchema
      }
    ]),
    UsersModule
  ],
  exports: [ TransactionsService ]
})
export class TransactionsModule {}
