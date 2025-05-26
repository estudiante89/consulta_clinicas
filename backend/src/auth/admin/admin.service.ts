
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './entities/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async create(data: Partial<Admin>): Promise<Admin> {
    const newAdmin = new this.adminModel(data);
    return newAdmin.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findById(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException('Admin not found');
    }
    return admin;
  }

  async update(id: string, updateData: Partial<Admin>): Promise<Admin> {
    const updated = await this.adminModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException('Admin not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.adminModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Admin not found');
    }
  }
}
