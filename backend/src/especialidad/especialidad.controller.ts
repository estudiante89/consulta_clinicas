
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { EspecialidadService } from './especialidad.service';
import { Especialidad } from './entities/especialidad.schema';

@Controller('especialidades')
export class EspecialidadController {
  constructor(private readonly especialidadService: EspecialidadService) {}

  @Post()
  create(@Body() data: Partial<Especialidad>) {
    return this.especialidadService.create(data);
  }

  @Get()
  findAll() {
    return this.especialidadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.especialidadService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Especialidad>) {
    return this.especialidadService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.especialidadService.delete(id);
  }
}
