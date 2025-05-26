
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Consultation, ConsultationDocument } from './entities/consultation.schema';

@Injectable()
export class ConsultationService {
  constructor(
    @InjectModel(Consultation.name) private consultationModel: Model<ConsultationDocument>,
  ) {}

  async create(data: Partial<Consultation>): Promise<Consultation> {
    const newConsultation = new this.consultationModel(data);
    return newConsultation.save();
  }

  async findAll(): Promise<Consultation[]> {
    return this.consultationModel.find().exec();
  }

  async findById(id: string): Promise<Consultation> {
    const consultation = await this.consultationModel.findById(id).exec();
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }
    return consultation;
  }

  async update(id: string, updateData: Partial<Consultation>): Promise<Consultation> {
    const updated = await this.consultationModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException('Consultation not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.consultationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Consultation not found');
    }
  }
}
