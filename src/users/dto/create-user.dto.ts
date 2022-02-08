
import { IsDateString, IsEmail, IsNotEmpty, IsString  } from 'class-validator'

import { User } from '~/users/user.schema'

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

  @IsNotEmpty()
  phone: string;
}
