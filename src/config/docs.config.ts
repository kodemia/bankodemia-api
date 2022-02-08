
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export const docsConfig = new DocumentBuilder()
  .setTitle('Bankodemia API 💵 ') 
  .setDescription(
    'Bankodemia is a fake bank service created to help students to learn how to consume a RESTful API' +
    '<br />' +
    '<br />' +
    'Created with 🖤 by [@Kodemiamx](https://kodemia.mx)'
  )
  .setVersion('1.0')
  .build();

