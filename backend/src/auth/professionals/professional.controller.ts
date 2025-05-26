
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Professional } from './entities/professional.schema';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Post()
  create(@Body() data: Partial<Professional>) {
    return this.professionalService.create(data);
  }

  @Get()
  findAll() {
    return this.professionalService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Professional>) {
    return this.professionalService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalService.delete(id);
  }
}
