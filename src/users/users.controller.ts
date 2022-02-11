import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';

import { UsersService } from '~/users/users.service';
import { CreateUserDto } from '~/users/dto/create-user.dto';
import { JwtAuthGuard } from '~/auth/guards/jwt-auth.guard';
import { UsersListResponse, SingleUserResponse, UserProfileResponse } from './dto/responses.dto';
import { BadPostRequestResponse } from '~/types/response.type';
import { User } from '~/decorators/user.decorator';
import { User as UserType } from './entities/user.schema';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBadRequestResponse({
    type: BadPostRequestResponse,
    description: 'Bad request'
  })
  @ApiCreatedResponse({
    type: SingleUserResponse,
    description: 'User Created'
  })
  @ApiBadRequestResponse({ description: 'Bad Request', status: 400 })
  @ApiOperation({ 
    summary: 'User sign up',
    description: 'Register a new user, `phone` and `email` should be unique'
  })
  @Post('')
  async create(@Body() createUserDto: CreateUserDto): Promise<SingleUserResponse> {
    const user = await this.usersService.create(createUserDto)

    return {
      success: true,
      data: { user }
    }
  }

  @ApiOkResponse({
    description: 'All users response',
    type: UsersListResponse
  })
  @ApiOperation({ summary: 'List users' })
  @Get('')
  async getAll (): Promise<UsersListResponse> {
    const users = await this.usersService.findAll('-password')
    return {
      success: true,
      data: { users }
    }
  }

  @ApiOkResponse({ 
    description: 'Ok',
    type: SingleUserResponse 
  })
  @ApiForbiddenResponse({ description: 'Not allowed to see other users details' })
  @ApiOperation({
    summary: 'Get a user'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne( @Request() request, @Param('id') id: string): Promise<SingleUserResponse> {
    const user = await this.usersService.findOne(id, '-password');

    return {
      success: true,
      data: { user }
    }
  }

  @ApiOkResponse({
    description: 'User profile',
    type: UserProfileResponse
  })
  @ApiOperation({
    description: 'Get user profile info: user, transactions and balance',
    summary: 'Get user full profile'
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/me/profile')
  async getProfileInfo(@User() user: UserType): Promise<UserProfileResponse> {
    const data = await this.usersService.getProfile(user._id)
    return {
      success: true,
      data
    }
  }
}
