import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';

import jwtConfig from '~/config/jwt.config';

import { AuthController } from '~/auth/auth.controller';
import { UsersModule } from '~/users/users.module';
import { EncryptService } from '~/encrypt/encrypt.service';
import { AuthService } from '~/auth/auth.service';

import { JWTStrategy } from '~/auth/strategies/jwt.strategy';
import { LocalStrategy } from '~/auth/strategies/local.strategy';

@Module({
  controllers: [ AuthController ],
  providers: [ 
    AuthService, 
    JWTStrategy,
    LocalStrategy,
    EncryptService
  ],
  imports: [
    JwtModule.registerAsync({
      inject: [ jwtConfig.KEY ],
      useFactory: (config: ConfigType<typeof jwtConfig>) => {
        return {
          secret: config.secret,
          signOptions: {  expiresIn: '1h' }
        }
      }
    }),
    UsersModule,
    PassportModule
  ],
  exports: [ AuthService, AuthModule ]
})
export class AuthModule {}
