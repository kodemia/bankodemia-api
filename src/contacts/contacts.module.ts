import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ContactsService } from '~/contacts/contacts.service';
import { ContactsController } from '~/contacts/contacts.controller';
import { UsersModule } from '~/users/users.module';
import { Contact, ContactSchema } from '~/contacts/entities/contact.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MongooseModule.forFeature([
      {
        name: Contact.name,
        schema: ContactSchema
      }
    ])
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
  exports: [ MongooseModule, ContactsService ]
})
export class ContactsModule {}
