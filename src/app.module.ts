import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import appConfig from '~/config/app.config'
import mongodbConfig from '~/config/mongodb.config'
import jwtConfig from '~/config/jwt.config'

import { MongoDBModule } from '~/mongoose/mongoose.module'

import { UsersModule } from '~/users/users.module';
import { AuthModule } from '~/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ appConfig, mongodbConfig, jwtConfig ]
    }),
    AuthModule,
    UsersModule,
    MongoDBModule,
  ]
})

export class AppModule {}
