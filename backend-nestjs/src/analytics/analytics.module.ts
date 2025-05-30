import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from '../appointments/appointment.schema';
import { MedicalHistory, MedicalHistorySchema } from '../medical-history/medical-history.schema';
import { User, UserSchema } from '../users/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: MedicalHistory.name, schema: MedicalHistorySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
