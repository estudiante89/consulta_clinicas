
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './entities/patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async create(data: Partial<Patient>): Promise<Patient> {
    const newPatient = new this.patientModel(data);
    return newPatient.save();
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }

  async findById(id: string): Promise<Patient> {
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
    return patient;
  }

  async update(id: string, updateData: Partial<Patient>): Promise<Patient> {
    const updated = await this.patientModel.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) {
      throw new NotFoundException('Patient not found');
    }
    return updated;
  }

  async delete(id: string): Promise<void> {
    const result = await this.patientModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Patient not found');
    }
  }
}
