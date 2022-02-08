import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty  } from 'class-validator'
import { CreateUserDto } from '~/users/dto/create-user.dto';

export class LoginDto extends PartialType(CreateUserDto) {
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  password?: string;
}
