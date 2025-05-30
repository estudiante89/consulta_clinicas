import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';

@Controller('medical-history')
export class MedicalHistoryController {
  constructor(private readonly service: MedicalHistoryService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Get('patient/:id')
  findByPatient(@Param('id') id: string) {
    return this.service.findByPatient(id);
  }

  @Get('doctor/:id')
  findByDoctor(@Param('id') id: string) {
    return this.service.findByDoctor(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
