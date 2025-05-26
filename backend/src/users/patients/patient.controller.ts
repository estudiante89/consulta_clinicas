
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from './entities/patient.schema';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post()
  create(@Body() data: Partial<Patient>) {
    return this.patientService.create(data);
  }

  @Get()
  findAll() {
    return this.patientService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Patient>) {
    return this.patientService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientService.delete(id);
  }
}
