
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Historial, HistorialDocument } from './entities/historial.schema';

@Injectable()
export class HistorialService {
  constructor(
    @InjectModel(Historial.name) private historialModel: Model<HistorialDocument>,
  ) {}

  async create(data: Partial<Historial>): Promise<Historial> {
    const newHistorial = new this.historialModel(data);
    return newHistorial.save();
  }

  async findAll(): Promise<Historial[]> {
    return this.historialModel.find().exec();
  }

  async findById(id: string): Promise<Historial> {
    const historial = await this.historialModel.findById(id).exec();
    if (!historial) {
      throw new NotFoundException('Historial not found');
    }
    return historial;
  }

  async update(id: string, updateData: Partial<Historial>): Promise<Historial> {
    const updated = await this.historialModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException('Historial not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.historialModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Historial not found');
    }
  }
}
