import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { JWTPayload } from '~/auth/auth.types';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '~/users/users.service';
import { User } from '~/users/entities/user.schema';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor( 
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('jwt.secret')
    });
  }

  validate(payload: JWTPayload): Promise<User> {
    return this.usersService.findOne(payload.sub)
  }
}