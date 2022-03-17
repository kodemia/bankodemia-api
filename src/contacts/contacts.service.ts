import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isMongoId } from 'class-validator';
import { Model } from 'mongoose';
import { CreateContactDto } from '~/contacts/dto/create-contact.dto';
import { UpdateContactDto } from '~/contacts/dto/update-contact.dto';
import { Contact } from '~/contacts/entities/contact.entity';
import { ContactPopulated } from './types/responses.types';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name) private contactsModel: Model<Contact>
  ){}
  create(createContactDto: CreateContactDto, owner: string): Promise<Contact> {
    return this.contactsModel.create({...createContactDto, owner})
  }

  listByOwnerId(ownerId: string): Promise<Contact[] | ContactPopulated[]> {
    return this.contactsModel.find({ owner: ownerId })
      .populate('owner')
      .populate('user')
      .exec()
  }

  findOne(id: string): Promise<Contact> {
    return this.contactsModel.findById(id)
      .populate('owner')
      .populate('user')
      .exec()
  }

  update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
    return this.contactsModel.findByIdAndUpdate(id, updateContactDto)
      .populate('owner')
      .populate('user')
      .exec()
  }

  remove(id: string) {
    return this.contactsModel.findByIdAndRemove(id)
      .populate('owner')
      .populate('user')
      .exec()
  }
}
