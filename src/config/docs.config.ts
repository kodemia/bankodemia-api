
import { DocumentBuilder } from "@nestjs/swagger";

export const docsConfig = new DocumentBuilder()
  .setTitle('Bankodemia API 💵 ') 
  .setDescription(
    'Bankodemia is a fake bank service created to help students to learn how to consume a RESTful API' +
    '<br />' +
    '<br />' +
    'Created with 🖤 by [@Kodemia](https://kodemia.mx) ' +
    '<br />' +
    '<br />' +
    '[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)]'+
    '(https://github.com/kodemia/bankodemia-api)'
  )
  .setVersion('1.0')
  .addBearerAuth()
  .build();

