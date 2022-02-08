import { PartialType } from '@nestjs/swagger';
import { CreateMovementDto } from '~/movements/dto/create-movement.dto';

export class UpdateMovementDto extends PartialType(CreateMovementDto) {}
