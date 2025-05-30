import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './appointment.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>) {}

  async create(data: Partial<Appointment>) {
    // Validar si el médico ya tiene una cita en ese horario
    const conflict = await this.appointmentModel.findOne({
      doctor: data.doctor,
      date: data.date,
      status: { $ne: 'cancelada' },
    });

    if (conflict) {
      throw new BadRequestException('El médico no está disponible en ese horario');
    }

    const appointment = new this.appointmentModel(data);
    return appointment.save();
  }

  async findAll() {
    return this.appointmentModel.find().populate('patient doctor', 'name email role');
  }

  async findByPatient(patientId: string) {
    return this.appointmentModel.find({ patient: patientId }).populate('doctor', 'name specialty');
  }

  async findByDoctor(doctorId: string) {
    return this.appointmentModel.find({ doctor: doctorId }).populate('patient', 'name');
  }

  async cancel(id: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    appointment.status = 'cancelada';
    return appointment.save();
  }

  async complete(id: string) {
    const appointment = await this.appointmentModel.findById(id);
    if (!appointment) throw new NotFoundException('Cita no encontrada');
    appointment.status = 'completada';
    return appointment.save();
  }
}
