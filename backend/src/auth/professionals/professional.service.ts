
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Professional, ProfessionalDocument } from './entities/professional.schema';

@Injectable()
export class ProfessionalService {
  constructor(
    @InjectModel(Professional.name) private professionalModel: Model<ProfessionalDocument>,
  ) {}

  async create(data: Partial<Professional>): Promise<Professional> {
    const newProfessional = new this.professionalModel(data);
    return newProfessional.save();
  }

  async findAll(): Promise<Professional[]> {
    return this.professionalModel.find().exec();
  }

  async findById(id: string): Promise<Professional> {
    const professional = await this.professionalModel.findById(id).exec();
    if (!professional) {
      throw new NotFoundException('Professional not found');
    }
    return professional;
  }

  async update(id: string, updateData: Partial<Professional>): Promise<Professional> {
    const updated = await this.professionalModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException('Professional not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.professionalModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Professional not found');
    }
  }
}
