import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Prescription, PrescriptionDocument } from './prescription.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class PrescriptionsService {
  constructor(
    @InjectModel(Prescription.name)
    private model: Model<PrescriptionDocument>,
  ) {}

  async create(data: Partial<Prescription>) {
    const prescription = new this.model({
      ...data,
      digitallySigned: true, // Simulación de firma digital automática
    });
    return prescription.save();
  }

  async findByDoctor(doctorId: string) {
    return this.model.find({ doctor: doctorId }).populate('patient', 'name');
  }

  async findByPatient(patientId: string) {
    return this.model.find({ patient: patientId }).populate('doctor', 'name');
  }

  async findById(id: string) {
    const pres = await this.model.findById(id).populate(['doctor', 'patient']);
    if (!pres) throw new NotFoundException('Receta no encontrada');
    return pres;
  }
}
