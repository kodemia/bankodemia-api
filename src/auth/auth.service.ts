import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EncryptService } from '~/encrypt/encrypt.service';
import { User } from '~/users/user.schema';
import { UsersService } from '~/users/users.service';
import { PhoneVerificationDto } from './dto/phone-verification.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private encryptService: EncryptService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email)
    if (!user) return null

    const isValidPassword = await this.encryptService.compare(password, user.password)
    if (!isValidPassword) return null

    return user
  }

  login (user: User): string {
    return this.jwtService.sign({
        id: user._id
    })
  }

  validatePhone (phoneVerificationObject: PhoneVerificationDto): Promise<boolean> {
    return this.userService.verifyPhone(
      phoneVerificationObject.phone,
      phoneVerificationObject.verificationCode
    )

  }
}
