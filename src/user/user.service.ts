import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const salt = 10;
    const password = await bcrypt.hash(user.password, salt);
    const createdUser = new this.userModel({ ...user, password });
    return await createdUser.save();
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async getByEmailOrFail(email: string): Promise<User> {
    const user = await this.getByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}