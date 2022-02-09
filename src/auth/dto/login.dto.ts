import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty  } from 'class-validator'

import { User } from '~/users/entities/user.schema';

import { ExpiresInEnum } from '~/auth/auth.types'

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

export class LoginResponse {
  @ApiProperty({ example: 'hHeEaDeRr.PpAayYLloOaAdD.SsiGgNnaAtTuRreE' })
  token: string

  @ApiProperty({ example: ExpiresInEnum["5m"], enum: ExpiresInEnum })
  expiresIn: ExpiresInEnum
}

export class LoginFailedResponse {
  @ApiProperty({ example: 401 })
  statusCode: number

  @ApiProperty({ example: 'Unauthorized' })
  message: string
}