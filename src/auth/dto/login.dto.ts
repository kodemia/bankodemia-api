import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty  } from 'class-validator'

import { User } from '~/users/entities/user.schema';

import { ExpiresInEnum } from '~/auth/auth.types'

export class LoginDto extends PartialType(User) {
  @ApiProperty({
    required: true,
    example: 'koder@kodemia.mx',
    description: 'Email address'
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: true,
    example: 'BondJames007',
    description: 'Plain text password'
  })
  @IsNotEmpty()
  password?: string;
}

export class LoginResponse {
  @ApiProperty({ 
    example: 'hHeEaDeRr.PpAayYLloOaAdD.SsiGgNnaAtTuRreE',
    description: 'User JWT Token'
  })
  token: string

  @ApiProperty({ 
    example: ExpiresInEnum["5m"], 
    enum: ExpiresInEnum,
    description: 'Token ttl'
  })
  expiresIn: ExpiresInEnum
}

export class LoginFailedResponse {
  @ApiProperty({ 
    example: 401,
    description: 'HTTP status code'
  })
  statusCode: number

  @ApiProperty({ 
    example: 'Unauthorized',
    description: 'Error message'
  })
  message: string
}