import { Injectable, NotFoundException, PreconditionFailedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose';

import { CreateUserDto } from '~/users/dto/create-user.dto';
import { UpdateUserDto } from '~/users/dto/update-user.dto';
import { User, UserDocument } from '~/users/entities/user.schema';
import { EncryptService } from '~/encrypt/encrypt.service';

@Injectable()
export class UsersService {
  constructor( 
    @InjectModel(User.name) private userModel: Model<User>,
    private encryptService: EncryptService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User>{

    const exists = await this.userModel.exists({ email: createUserDto.email })
    if (exists) {
      throw new PreconditionFailedException({
        message: 'User already exists'
      })
    }

    const passwordHashed = await this.encryptService.hash(createUserDto.password)

    return this.userModel.create({
      ...createUserDto,
      password: passwordHashed
    })
  }

  findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email }).exec()
  }

  async verifyPhone(phone: string, phoneVerificationCode: string): Promise<boolean> {
    const user = await this.userModel.findOne({
      phone,
      phoneVerificationCode
    })

    if (!user) throw new NotFoundException('No user found with this phone or verification code')
    if (user.isPhoneVerified) throw new PreconditionFailedException("User's phone already verified")

    if  (user.phoneVerificationCode === phoneVerificationCode) {
      await this.userModel.findByIdAndUpdate(user.id, { isPhoneVerified: true })
    }

    return true
  }

  findAll(select: string = null): Promise<User[]> {
    return this.userModel
      .find()
      .select(select)
      .exec()
  }

  findOne(id: string, select:string = null): Promise<User> {
    return this.userModel.findById(id)
      .select(select)
      .exec()
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec()
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec()
  }
}
