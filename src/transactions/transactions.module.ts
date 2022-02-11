import { forwardRef, Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { UsersModule } from '~/users/users.module';

@Module({
  imports: [
    forwardRef(() =>  UsersModule),
    MongooseModule.forFeature([
      { 
        name: Transaction.name,
        schema: TransactionSchema
      }
    ]),
  ],
  controllers: [TransactionsController],
  providers: [ TransactionsService ],
  exports: [ 
    MongooseModule,
    TransactionsService 
  ]
})
export class TransactionsModule {}
