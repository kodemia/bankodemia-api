import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '~/app.module';
import { docsConfig } from '~/config/docs.config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())

  SwaggerModule.setup(
    '/docs',
    app, 
    SwaggerModule.createDocument(app, docsConfig),
    {
      customfavIcon: 'https://kodemia.mx/favicon.ico',
      customSiteTitle: 'Bankodemia | Docs'
    }
  );

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
