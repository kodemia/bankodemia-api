import { Body, Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiOperation, ApiProperty, ApiQuery, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from '~/auth/auth.service';
import { LocalAuthGuard } from '~/auth/guards/local-auth.guard';
import { LoginDto } from '~/auth/dto/login.dto'
import { PhoneVerificationDto } from '~/auth/dto/phone-verification.dto'

import { ExpiresInEnum } from '~/auth/auth.types'
import { LoginResponse, LoginFailedResponse } from '~/auth/dto/login.dto'

@ApiExtraModels(LoginResponse)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService) {}
  
  @ApiUnauthorizedResponse({
    status: 401,
    description: 'Invalid Credentials',
    type: LoginFailedResponse
  })
  @ApiCreatedResponse({
    description: 'User Logged In',
    type: LoginResponse
  })
  @ApiOperation({ summary: 'Log in user',  })
  @ApiQuery({ 
    name: 'expires_in',
    enum: ExpiresInEnum,
    description: 'time to live for the token in minutes or hour' 
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request, @Body() body: LoginDto, @Query('expires_in') expires_in: ExpiresInEnum): LoginResponse {
    console.log('req.user: ', request.user)
    return { 
      token: this.authService.login(request.user, expires_in),
      expiresIn: expires_in
    }
  }

  @ApiOperation({
    summary: "Verify user´s phone"
  })
  @Post('/phone/verification')
  phoneVerify (@Body() body: PhoneVerificationDto) {
    
  }
}

