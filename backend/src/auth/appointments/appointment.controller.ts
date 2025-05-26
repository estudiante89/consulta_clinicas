
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from './entities/appointment.schema';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  create(@Body() data: Partial<Appointment>) {
    return this.appointmentService.create(data);
  }

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Appointment>) {
    return this.appointmentService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.delete(id);
  }
}
