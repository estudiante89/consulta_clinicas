
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { MedicoService } from './medico.service';
import { Medico } from './entities/medico.schema';

@Controller('medicos')
export class MedicoController {
  constructor(private readonly medicoService: MedicoService) {}

  @Post()
  create(@Body() data: Partial<Medico>) {
    return this.medicoService.create(data);
  }

  @Get()
  findAll() {
    return this.medicoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicoService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Medico>) {
    return this.medicoService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicoService.delete(id);
  }
}
