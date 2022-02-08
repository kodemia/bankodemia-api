import { IsNotEmpty, IsPhoneNumber  } from 'class-validator'

export class PhoneVerificationDto {
  @IsPhoneNumber()
  phone: string

  @IsNotEmpty()
  verificationCode: string
}
