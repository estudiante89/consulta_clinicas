
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorialService } from './historial.service';
import { HistorialController } from './historial.controller';
import { Historial, HistorialSchema } from './entities/historial.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Historial.name, schema: HistorialSchema }])],
  controllers: [HistorialController],
  providers: [HistorialService],
  exports: [HistorialService],
})
export class HistorialModule {}
