import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { MedicalHistory, MedicalHistorySchema } from './medical-history.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: MedicalHistory.name, schema: MedicalHistorySchema }])],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService],
})
export class MedicalHistoryModule {}
