import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import parsePhoneNumber from 'libphonenumber-js';

import { CreateUserDto } from '~/users/dto/create-user.dto';
import { UpdateUserDto } from '~/users/dto/update-user.dto';
import { User, UserDocument } from '~/users/entities/user.schema';
import { EncryptService } from '~/encrypt/encrypt.service';
import { TransactionsService } from '~/transactions/transactions.service';
import { UserProfile } from './dto/responses.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private encryptService: EncryptService,
    @Inject(forwardRef(() => TransactionsService))
    private transactionsService: TransactionsService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const exists = await this.userModel.exists({ email: createUserDto.email });
    if (exists) {
      throw new PreconditionFailedException({
        message: 'User already exists',
      });
    }

    const phone = parsePhoneNumber(createUserDto.phone, 'MX').format('E.164');
    const phoneExists = await this.userModel.exists({ phone });
    if (phoneExists) {
      throw new PreconditionFailedException({
        message: 'User phone already exists',
      });
    }

    const passwordHashed = await this.encryptService.hash(
      createUserDto.password,
    );

    return this.userModel.create({
      ...createUserDto,
      password: passwordHashed,
    });
  }

  findByEmail(email: string, select: string = null): Promise<User> {
    return this.userModel.findOne({ email }).select(select).exec();
  }

  async verifyPhone(
    phone: string,
    phoneVerificationCode: string,
  ): Promise<boolean> {
    const user = await this.userModel.findOne({
      phone,
      phoneVerificationCode,
    });

    if (!user)
      throw new NotFoundException(
        'No user found with this phone or verification code',
      );
    if (user.isPhoneVerified)
      throw new PreconditionFailedException("User's phone already verified");

    if (user.phoneVerificationCode === phoneVerificationCode) {
      await this.userModel.findByIdAndUpdate(user.id, {
        isPhoneVerified: true,
      });
    }

    return true;
  }

  findAll(select: string = null): Promise<User[]> {
    return this.userModel.find().select(select).exec();
  }

  findOne(id: string, select: string = null): Promise<User> {
    return this.userModel.findById(id).select(select).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async getProfile(id: string): Promise<UserProfile> {
    const user = await this.userModel.findById(id);
    const transactions = await this.transactionsService.getByUserId(id);
    const balance = await this.transactionsService.getCurrentBalanceByUserId(
      id,
    );

    return {
      user,
      transactions,
      balance,
    };
  }

  async search (query: string): Promise<User[]> {
    const regex = new RegExp(query, 'ig')
    return this.userModel.find({
      $or: [
        { email: regex },
        { phone: regex },
        { name: regex },
        { lastName: regex }
      ]
    }).select('+phone').exec()
  }
}
