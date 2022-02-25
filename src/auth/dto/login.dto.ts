import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { User } from '~/users/entities/user.schema';

import { ExpiresInEnum, ExpiresInTypes } from '~/auth/auth.types';

export class LoginDto extends PartialType(User) {
  @ApiProperty({
    required: true,
    example: 'koder@kodemia.mx',
    description: 'Email address',
  })
  @IsEmail()
  email?: string;

  @ApiProperty({
    required: true,
    example: 'BondJames007',
    description: 'Plain text password',
  })
  @IsNotEmpty()
  @IsString()
  password?: string;
}

export class LoginResponse {
  @ApiProperty({
    example: 'hHeEaDeRr.PpAayYLloOaAdD.SsiGgNnaAtTuRreE',
    description:
      'User token. you can extract the userId from the token payload under the key `sub`',
  })
  token: string;

  @ApiProperty({
    example: ExpiresInEnum['5m'],
    enum: ExpiresInEnum,
    description: 'Token ttl',
  })
  expiresIn: ExpiresInEnum;
}

export class LoginFailedResponse {
  @ApiProperty({
    example: 401,
    description: 'HTTP status code',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Unauthorized',
    description: 'Error message',
  })
  message: string;
}

export class LoginQuery {
  @ApiProperty({
    example: ExpiresInEnum['1h'],
    description:
      'JWT Time to live. `h` = hours and `m` = minutes. 1m minimum and 24h maximum, Defaults to 1h',
    required: false,
    default: ExpiresInEnum['1h']
  })
  @IsOptional()
  @IsIn(ExpiresInTypes)
  expires_in?: ExpiresInEnum;
}
