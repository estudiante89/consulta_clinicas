
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Especialidad, EspecialidadDocument } from './entities/especialidad.schema';

@Injectable()
export class EspecialidadService {
  constructor(
    @InjectModel(Especialidad.name) private especialidadModel: Model<EspecialidadDocument>,
  ) {}

  async create(data: Partial<Especialidad>): Promise<Especialidad> {
    const nuevaEspecialidad = new this.especialidadModel(data);
    return nuevaEspecialidad.save();
  }

  async findAll(): Promise<Especialidad[]> {
    return this.especialidadModel.find().exec();
  }

  async findById(id: string): Promise<Especialidad> {
    const especialidad = await this.especialidadModel.findById(id).exec();
    if (!especialidad) {
      throw new NotFoundException('Especialidad not found');
    }
    return especialidad;
  }

  async update(id: string, updateData: Partial<Especialidad>): Promise<Especialidad> {
    const updated = await this.especialidadModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException('Especialidad not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.especialidadModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Especialidad not found');
    }
  }
}
