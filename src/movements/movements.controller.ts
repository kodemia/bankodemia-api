import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MovementsService } from '~/movements/movements.service';
import { CreateMovementDto } from '~/movements/dto/create-movement.dto';
import { UpdateMovementDto } from '~/movements/dto/update-movement.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Movements')
@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post()
  create(@Body() createMovementDto: CreateMovementDto) {
    return this.movementsService.create(createMovementDto);
  }

  @Get()
  findAll() {
    return this.movementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovementDto: UpdateMovementDto) {
    return this.movementsService.update(+id, updateMovementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movementsService.remove(+id);
  }
}
