
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ConsultationService } from './consultation.service';
import { Consultation } from './entities/consultation.schema';

@Controller('consultations')
export class ConsultationController {
  constructor(private readonly consultationService: ConsultationService) {}

  @Post()
  create(@Body() data: Partial<Consultation>) {
    return this.consultationService.create(data);
  }

  @Get()
  findAll() {
    return this.consultationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consultationService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Consultation>) {
    return this.consultationService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consultationService.delete(id);
  }
}
