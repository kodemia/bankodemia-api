import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty  } from 'class-validator'
import { User } from '~/users/entities/user.schema';

export class LoginDto extends PartialType(User) {
  @ApiProperty({
    required: true,
    example: 'koder@kodemia.mx'
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: true,
    example: 'BondJames007'
  })
  @IsNotEmpty()
  password?: string;
}
