import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { ControllerResponse } from "~/types/response.type";
import { User } from "~/users/entities/user.schema";

class UsersList {
  @ApiProperty({
    isArray: true,
    type: () => User,
    description: 'Users List'
  })
  users: User[]
}

class SingleUser {
  user: User
}

export class UsersListResponse extends ControllerResponse {
  @ApiProperty({
    type: () => UsersList,
    description: 'payload'
  })
  data: UsersList
}

export class SingleUserResponse extends ControllerResponse {
  @ApiProperty({ type: () => SingleUser })
  data: SingleUser
}
