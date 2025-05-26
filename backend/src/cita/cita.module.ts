
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitaService } from './cita.service';
import { CitaController } from './cita.controller';
import { Cita, CitaSchema } from './entities/cita.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cita.name, schema: CitaSchema }])],
  controllers: [CitaController],
  providers: [CitaService],
  exports: [CitaService],
})
export class CitaModule {}
