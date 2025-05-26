
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from './entities/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async create(data: Partial<Role>): Promise<Role> {
    const created = new this.roleModel(data);
    return created.save();
  }

  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  async findById(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) throw new NotFoundException('Rol no encontrado');
    return role;
  }

  async update(id: string, data: Partial<Role>): Promise<Role> {
    const updated = await this.roleModel.findByIdAndUpdate(id, data, { new: true }).exec();
    if (!updated) throw new NotFoundException('Rol no encontrado');
    return updated;
  }

  async delete(id: string): Promise<Role> {
    const deleted = await this.roleModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException('Rol no encontrado');
    return deleted;
  }
}
