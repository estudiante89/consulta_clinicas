
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MedicoService } from './medico.service';
import { MedicoController } from './medico.controller';
import { Medico, MedicoSchema } from './entities/medico.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Medico.name, schema: MedicoSchema }])],
  controllers: [MedicoController],
  providers: [MedicoService],
  exports: [MedicoService],
})
export class MedicoModule {}
