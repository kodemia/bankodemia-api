import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '~/auth/guards/jwt-auth.guard';
import { User } from '~/decorators/user.decorator';
import { User as UserType } from '~/users/entities/user.schema';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import {
  GetContactResponse,
  GetContactsListResponse,
  PostContactResponse
} from '~/contacts/types/responses.types';

@ApiTags('Contacts')
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @ApiCreatedResponse({
    description: 'Contact saved',
    type: PostContactResponse
  })
  @ApiBody({
    type: CreateContactDto
  })
  @ApiOperation({
    summary: 'Save a contact',
    description: 'Add a contact to your list'
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createContactDto: CreateContactDto): Promise<PostContactResponse> {
    const contact = await this.contactsService.create(createContactDto);
    return {
      success: true,
      data: { contact }
    }
  }

  @ApiOkResponse({
    description: 'Ok',
    type: GetContactsListResponse
  })
  @ApiOperation({
    summary: 'List all your contacts',
    description: 'List all your saved contacts'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async list(@User() user: UserType) {
    const list = await this.contactsService.listByOwnerId(user._id);
    return {
      success: true,
      data: {
        contacts: list
      }
    }
  }
  
  @ApiOkResponse({
    description: 'Ok',
    type: GetContactResponse
  })
  @ApiOperation({
    summary: 'Get a contact'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const contact = await this.contactsService.findOne(id);
    return {
      success: true,
      data: {
        contact
      }
    }
  }

  @ApiOkResponse({
    description: 'Updated',
    type: GetContactResponse
  })
  @ApiOperation({
    summary: 'Update a contact'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    const updatedContact = await this.contactsService.update(id, updateContactDto);
    return {
      success: true,
      data: {
        contact: updatedContact
      }
    }
  }

  @ApiOkResponse({
    description: 'Deleted',
    type: GetContactResponse
  })
  @ApiOperation({
    summary: 'Delete a contact'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const contactDeleted = await this.contactsService.remove(id);
    return {
      success: true,
      data: {
        contact: contactDeleted
      }
    }
  }
}
