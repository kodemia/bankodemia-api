import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { RedocModule } from 'nestjs-redoc';

import { AppModule } from '~/app.module';
import { docsConfig } from '~/config/docs.config';
import { redocConfig } from '~/config/redoc.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true
  }));

  SwaggerModule.setup(
    '/swagger',
    app,
    SwaggerModule.createDocument(app, docsConfig),
    {
      customfavIcon: 'https://kodemia.mx/favicon.ico',
      customSiteTitle: 'Bankodemia | Docs',
      url: process.env.HOST,
    },
  );

  await RedocModule.setup(
    '/docs',
    app,
    SwaggerModule.createDocument(app, docsConfig),
    redocConfig,
  );

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
