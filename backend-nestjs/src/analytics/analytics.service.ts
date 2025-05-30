import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from '../appointments/appointment.schema';
import { MedicalHistory, MedicalHistoryDocument } from '../medical-history/medical-history.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/user.schema';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(MedicalHistory.name) private historyModel: Model<MedicalHistoryDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async patientsPerDoctor() {
    const result = await this.appointmentModel.aggregate([
      { $match: { status: 'completada' } },
      {
        $group: {
          _id: '$doctor',
          total: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'doctor',
        },
      },
      { $unwind: '$doctor' },
      { $project: { _id: 0, doctor: '$doctor.name', total: 1 } },
    ]);
    return result;
  }

  async appointmentsByModality() {
    const result = await this.appointmentModel.aggregate([
      { $group: { _id: '$modality', total: { $sum: 1 } } },
    ]);
    return result;
  }

  async historyEntriesPerMonth(year: number) {
    const result = await this.historyModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lt: new Date(`${year + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          entries: { $sum: 1 },
        },
      },
      {
        $sort: { '_id': 1 },
      },
    ]);
    return result;
  }
}
