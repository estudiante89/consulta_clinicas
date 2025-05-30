import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = new this.userModel({ ...userDto, password: hashedPassword });
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id);
  }
}
