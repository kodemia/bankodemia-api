import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiExtraModels, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

import { AuthService } from '~/auth/auth.service';
import { LocalAuthGuard } from '~/auth/guards/local-auth.guard';
import { LoginDto } from '~/auth/dto/login.dto'
import { PhoneVerificationDto } from '~/auth/dto/phone-verification.dto'

class LoginResponse {
  @ApiProperty({ example: 'hHeEaDeRr.PpAayYLloOaAdD.SsiGgNnaAtTuRreE' })
  token: string
}

@ApiExtraModels(LoginResponse)
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor( private authService: AuthService) {}
  
  @ApiCreatedResponse({
    description: 'User Logged In',
    type: LoginResponse
  })
  @ApiOperation({ summary: 'Log In user' })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() request, @Body() body: LoginDto): LoginResponse {
    return { 
      token: this.authService.login(request.user)
    }
  }

  @ApiOperation({
    summary: "Verify user´s phone"
  })
  @Post('/phone/verification')
  phoneVerify (@Body() body: PhoneVerificationDto) {
    
  }
}

