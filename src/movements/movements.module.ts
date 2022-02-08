import { Module } from '@nestjs/common';
import { MovementsService } from '~/movements/movements.service';
import { MovementsController } from '~/movements/movements.controller';

@Module({
  controllers: [MovementsController],
  providers: [MovementsService]
})
export class MovementsModule {}
