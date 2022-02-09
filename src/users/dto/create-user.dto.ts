
import { IsBase64, IsDateString, IsEmail, IsIn, IsNotEmpty, IsPhoneNumber, IsString  } from 'class-validator'

import { User, identityImageTypes, IdentityImageType } from '~/users/entities/user.schema'

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

  @IsPhoneNumber()
  phone: string;

  @IsBase64()
  identityImage: string;

  @IsIn(identityImageTypes)
  identityImageType: IdentityImageType;
}
