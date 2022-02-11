import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigType } from '@nestjs/config';

import mongodbConfig from '~/config/mongodb.config';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigType<typeof mongodbConfig>) => {
        const { host, name: dbName, password: pass, user } = config;
        const uri = `mongodb+srv://${host}`;

        return { uri, user, pass, dbName };
      },
      inject: [mongodbConfig.KEY],
    }),
  ],
  exports: [MongooseModule],
})
export class MongoDBModule {}
