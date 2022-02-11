import { DocumentBuilder } from '@nestjs/swagger';

export const docsConfig = new DocumentBuilder()
  .setTitle('Bankodemia API 💵 ')
  .setDescription(
    'Bankodemia is a fake bank service created to help students to learn how to consume a RESTful API' +
    '<br />' +
    '<br />' +
    'This API uses JWT as authentication method so to retrieve information from protected routes you first need to Log in ' +
    'then send the token in the `Authorization` header in this format `Bearer [token]` '+
    '<br />' +
    'You will notice that an endpoint in protected because they have `bearer` listed under the Authorizations property' +
    '<br />' +
    '<br />' +
    'API Server: [https://bankodemia.kodemia.mx](https://bankodemia.kodemia.mx)' +
    '<br />' +
    '<br />' +
    'Created with 🖤 by [@Kodemia](https://kodemia.mx) ' +
    '<br />' +
    '<br />' +
    '[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)]' +
    '(https://github.com/kodemia/bankodemia-api)',
  )
  .addServer('https://bankodemia.kodemia.mx', 'Production server')
  .addSecurity('secur', { type: 'http' })
  .setVersion('1.0')
  .addBearerAuth()
  .build();
