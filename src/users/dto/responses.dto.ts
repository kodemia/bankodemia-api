import { ApiProperty } from '@nestjs/swagger';
import { TransactionPopulated } from '~/transactions/response.types';
import { ControllerResponse } from '~/types/response.type';
import { User } from '~/users/entities/user.schema';

export class UsersList {
  @ApiProperty({
    isArray: true,
    type: () => User,
    description: 'Users List',
  })
  users: User[];
}

class SingleUser {
  user: User;
}

export class UserProfile {
  user: User;
  transactions: TransactionPopulated[];
  balance: number;
}

export class UsersListResponse extends ControllerResponse {
  @ApiProperty({
    type: () => UsersList,
    description: 'payload',
  })
  data: UsersList;
}

export class SingleUserResponse extends ControllerResponse {
  @ApiProperty({ type: () => SingleUser })
  data: SingleUser;
}

export class UserProfileResponse extends ControllerResponse {
  @ApiProperty({
    type: UserProfile,
  })
  data: UserProfile;
}
