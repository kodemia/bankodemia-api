import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsPhoneNumber, IsString } from 'class-validator';
import { CreateUserDto } from '~/users/dto/create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsDateString()
  birthDate?: Date;

  @IsString()
  lastName?: string;

  @IsString()
  name?: string;

  @IsString()
  occupation?: string;
}
