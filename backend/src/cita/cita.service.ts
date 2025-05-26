
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cita, CitaDocument } from './entities/cita.schema';

@Injectable()
export class CitaService {
  constructor(
    @InjectModel(Cita.name) private citaModel: Model<CitaDocument>,
  ) {}

  async create(data: Partial<Cita>): Promise<Cita> {
    const newCita = new this.citaModel(data);
    return newCita.save();
  }

  async findAll(): Promise<Cita[]> {
    return this.citaModel.find().exec();
  }

  async findById(id: string): Promise<Cita> {
    const cita = await this.citaModel.findById(id).exec();
    if (!cita) {
      throw new NotFoundException('Cita not found');
    }
    return cita;
  }

  async update(id: string, updateData: Partial<Cita>): Promise<Cita> {
    const updated = await this.citaModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException('Cita not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.citaModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Cita not found');
    }
  }
}
