import { 
  Controller,
  Post,
  Body,
  UseGuards,
  BadRequestException,
  Get,
  Param
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiPreconditionFailedResponse,
  ApiResponse,
  ApiTags
} from '@nestjs/swagger';

import { TransactionsService } from '~/transactions/transactions.service';
import { CreateTransactionDto } from '~/transactions/dto/create-transaction.dto';
import { JwtAuthGuard } from '~/auth/guards/jwt-auth.guard';
import { BadPostRequestResponse, NotFoundResponse } from '~/types/response.type';
import { GetByIdParams, TransactionType } from '~/transactions/entities/transaction.entity';
import { 
  SingleTransactionResponse,
  PaymentRequestExceptionResponse,
  PreconditionFailedExceptionResponse,
  TransactionCreatedResponse,
  MultipleTransactionResponse
} from '~/transactions/response.types';
import { User } from '~/decorators/user.decorator';
import { User as UserType } from '~/users/entities/user.schema';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiResponse({
    status: 402,
    description: 'You are broke',
    type: PaymentRequestExceptionResponse
  })
  @ApiPreconditionFailedResponse({
    description: 'Insufficient founds',
    type: PreconditionFailedExceptionResponse
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
    type: BadPostRequestResponse
  })
  @ApiCreatedResponse({ 
    description: 'Transaction created',
    type: TransactionCreatedResponse
  })
  @ApiOperation({
    summary: 'Make a transaction',
    description: 'Make a `PAYMENT` to another user account or make a `DEPOSIT` to your own account'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@User() user: UserType, @Body() createTransactionDto: CreateTransactionDto) {
    if (
      createTransactionDto.type === TransactionType.Deposit &&
      createTransactionDto.destinationUser != null
    ) {
      throw new BadRequestException(`destinationUser is not required when performing a ${TransactionType.Deposit}`)
    }

    if (
      createTransactionDto.type === TransactionType.Payment &&
      createTransactionDto.destinationUser == null
    ) {
      throw new BadRequestException(`destinationUser should be provided id transaction is ${TransactionType.Payment}`)
    }

    createTransactionDto.issuer = user._id
    const { transaction, finalBalance } = await this.transactionsService.create(createTransactionDto);
    
    return {
      success: true,
      data: { transaction, finalBalance }
    }
  }

  @ApiOkResponse({
    description: 'Ok',
    type: MultipleTransactionResponse
  })
  @ApiOperation({
    summary: 'List my transactions',
    description: 'List the transaction that belongs to the user in the token provided along with the user balance'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUserTransactions (@User() user: UserType) {
    const transactions = await this.transactionsService.getByUserId(user._id)

    return {
      success: true,
      data: { transactions }
    }
  }

  @ApiNotFoundResponse({
    type: NotFoundResponse,
    description: 'Not found'
  })
  @ApiOkResponse({
    type: SingleTransactionResponse,
    description: 'Ok'
  })
  @ApiOperation({
    summary: 'Get transaction detail',
    description: 'Get transaction detail with users populated'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getDetail(@Param() param: GetByIdParams) {
    const transaction = await this.transactionsService.getById(param.id)
    return {
      success: true,
      data: { transaction }
    }
  }
}
