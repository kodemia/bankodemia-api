import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '~/auth/auth.service';
import { LocalAuthGuard } from '~/auth/guards/local-auth.guard';
import { LoginDto } from '~/auth/dto/login.dto'
import { PhoneVerificationDto } from '~/auth/dto/phone-verification.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request, @Body() body: LoginDto) {
    return { 
      token: this.authService.login(request.user)
    }
  }

  @Post('/phone/verification')
  phoneVerify (@Body() body: PhoneVerificationDto) {
    
  }
}

