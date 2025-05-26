
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CitaService } from './cita.service';
import { Cita } from './entities/cita.schema';

@Controller('citas')
export class CitaController {
  constructor(private readonly citaService: CitaService) {}

  @Post()
  create(@Body() data: Partial<Cita>) {
    return this.citaService.create(data);
  }

  @Get()
  findAll() {
    return this.citaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.citaService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Cita>) {
    return this.citaService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.citaService.delete(id);
  }
}
