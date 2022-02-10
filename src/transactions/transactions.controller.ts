import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '~/auth/guards/jwt-auth.guard';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiOperation({
    summary: 'Make a transaction',
    description: 'Make a `PAYMENT` to another user account or make a `DEPOSIT` to your own account'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() request, @Body() createTransactionDto: CreateTransactionDto) {
    const issuer = request.user._id
    console.log('issuer: ', issuer)
    createTransactionDto.issuer = issuer
    return this.transactionsService.create(createTransactionDto);
  }
}
