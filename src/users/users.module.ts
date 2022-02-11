import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'

import { UsersService } from '~/users/users.service';
import { UsersController } from '~/users/users.controller';
import { User, UserSchema } from '~/users/entities/user.schema'
import { EncryptService } from '~/encrypt/encrypt.service';
import { TransactionsModule } from '~/transactions/transactions.module';
import { TransactionsService } from '~/transactions/transactions.service';

@Module({
  imports: [
    forwardRef(() =>  TransactionsModule),
    MongooseModule.forFeature([
      { 
        name: User.name,
        schema: UserSchema
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, EncryptService],
  exports: [ 
    MongooseModule,
    UsersService
  ]
})
export class UsersModule {}
