import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() data: any) {
    return this.appointmentsService.create(data);
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get('patient/:id')
  findByPatient(@Param('id') id: string) {
    return this.appointmentsService.findByPatient(id);
  }

  @Get('doctor/:id')
  findByDoctor(@Param('id') id: string) {
    return this.appointmentsService.findByDoctor(id);
  }

  @Patch(':id/cancel')
  cancel(@Param('id') id: string) {
    return this.appointmentsService.cancel(id);
  }

  @Patch(':id/complete')
  complete(@Param('id') id: string) {
    return this.appointmentsService.complete(id);
  }
}
