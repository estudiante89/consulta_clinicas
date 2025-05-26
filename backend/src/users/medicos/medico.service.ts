
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Medico, MedicoDocument } from './entities/medico.schema';

@Injectable()
export class MedicoService {
  constructor(
    @InjectModel(Medico.name) private medicoModel: Model<MedicoDocument>,
  ) {}

  async create(data: Partial<Medico>): Promise<Medico> {
    const newMedico = new this.medicoModel(data);
    return newMedico.save();
  }

  async findAll(): Promise<Medico[]> {
    return this.medicoModel.find().exec();
  }

  async findById(id: string): Promise<Medico> {
    const medico = await this.medicoModel.findById(id).exec();
    if (!medico) {
      throw new NotFoundException('Medico not found');
    }
    return medico;
  }

  async update(id: string, updateData: Partial<Medico>): Promise<Medico> {
    const updated = await this.medicoModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException('Medico not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.medicoModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Medico not found');
    }
  }
}
