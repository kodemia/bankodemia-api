
import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsDateString, IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, IsString  } from 'class-validator'

import { User, identityImageTypes, IdentityImageType } from '~/users/user.schema'

export class CreateUserDto extends User { 
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  lastName: string;

  @IsString()
  occupation?: string;

  @IsDateString()
  birthDate: Date;

  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Phone with country code',
    example: '+525578105138'
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    description: 'Image as Base64 string'
  })
  @IsBase64()
  identityImage: string;

  @ApiProperty({ 
    enum: identityImageTypes,
    description: 'Type of the identity provided in the `identityImage` attribute'
  })
  @IsIn(identityImageTypes)
  identityImageType: IdentityImageType;
}
