
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './entities/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<AdminDocument>) {}

  async create(data: Partial<Admin>): Promise<Admin> {
    const created = new this.adminModel(data);
    return created.save();
  }

  async findAll(): Promise<Admin[]> {
    return this.adminModel.find().exec();
  }

  async findById(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) throw new NotFoundException('Admin no encontrado');
    return admin;
  }

  async update(id: string, data: Partial<Admin>): Promise<Admin> {
    const updated = await this.adminModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Admin no encontrado');
    return updated;
  }

  async delete(id: string): Promise<Admin> {
    const deleted = await this.adminModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Admin no encontrado');
    return deleted;
  }
}
