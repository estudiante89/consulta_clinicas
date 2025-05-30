
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    AuthModule,
    AppointmentsModule,
    MedicalHistoryModule,
    PrescriptionsModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
