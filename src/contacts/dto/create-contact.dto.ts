import { OmitType } from "@nestjs/swagger";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import { Contact } from "~/contacts/entities/contact.entity";

export class CreateContactDto extends OmitType(Contact, ['owner']) {
  @IsOptional()
  @IsString()
  shortName: string;

  @IsMongoId()
  user: string;
}
