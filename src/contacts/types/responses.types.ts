import { ApiProperty, OmitType } from "@nestjs/swagger";
import { ControllerResponse } from "~/types/response.type";
import { User } from "~/users/entities/user.schema";
import { Contact } from "~/contacts/entities/contact.entity";

export class ContactPopulated extends OmitType(Contact, [ 'owner', 'user' ]){
  @ApiProperty({
    type: () => User,
    description: 'Contact owner'
  })
  owner: User
  
  @ApiProperty({
    type: () => User,
    description: 'Contact saved'
  })
  user: User
}

export class SingleContactData {
  @ApiProperty({
    description: 'Contact',
    type: ContactPopulated
  })
  contact: ContactPopulated | Contact
}

export class MultipleContactsData {
  @ApiProperty({
    isArray: true,
    description: 'Contacts',
    type: ContactPopulated
  })
  contacts: ContactPopulated[]
}

export class GetContactsListResponse extends ControllerResponse {
  @ApiProperty({
    description: 'Get all contacts data',
    type: MultipleContactsData
  })
  data: MultipleContactsData
}

export class PostContactResponse extends ControllerResponse {
  @ApiProperty({
    description: 'Contact saved data',
    type: SingleContactData
  })
  data: SingleContactData
}

export class GetContactResponse extends ControllerResponse {
  @ApiProperty({
    description: 'Contact created data',
    type: SingleContactData
  })
  data: SingleContactData
}
