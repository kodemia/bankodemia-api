import { Body, Controller, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { AuthService } from '~/auth/auth.service';
import { LocalAuthGuard } from '~/auth/guards/local-auth.guard';
import { LoginDto, LoginQuery } from '~/auth/dto/login.dto'

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
  @ApiOperation({ summary: 'User Log in',  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request, @Body() body: LoginDto, @Query() query: LoginQuery): LoginResponse {
    return { 
      token: this.authService.login(request.user, query.expires_in),
      expiresIn: query.expires_in || ExpiresInEnum['1h']
    }
  }

  // TODO: Implement this
  // @ApiOperation({
  //   summary: "Verify user's phone"
  // })
  // @Post('/phone/verification')
  // phoneVerify (@Body() body: PhoneVerificationDto) {
  // }
}

