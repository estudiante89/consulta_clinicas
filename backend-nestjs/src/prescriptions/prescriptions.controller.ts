import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { PrescriptionsService } from './prescriptions.service';

@Controller('prescriptions')
export class PrescriptionsController {
  constructor(private readonly service: PrescriptionsService) {}

  @Post()
  create(@Body() data: any) {
    return this.service.create(data);
  }

  @Get('doctor/:id')
  findByDoctor(@Param('id') id: string) {
    return this.service.findByDoctor(id);
  }

  @Get('patient/:id')
  findByPatient(@Param('id') id: string) {
    return this.service.findByPatient(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
