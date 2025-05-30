import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MedicalHistory, MedicalHistoryDocument } from './medical-history.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectModel(MedicalHistory.name)
    private model: Model<MedicalHistoryDocument>,
  ) {}

  async create(data: Partial<MedicalHistory>) {
    const history = new this.model(data);
    return history.save();
  }

  async findByPatient(patientId: string) {
    return this.model.find({ patient: patientId }).populate('doctor', 'name').sort({ createdAt: -1 });
  }

  async findByDoctor(doctorId: string) {
    return this.model.find({ doctor: doctorId }).populate('patient', 'name').sort({ createdAt: -1 });
  }

  async findById(id: string) {
    const history = await this.model.findById(id).populate(['patient', 'doctor']);
    if (!history) throw new NotFoundException('Registro no encontrado');
    return history;
  }
}
