
import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { HistorialService } from './historial.service';
import { Historial } from './entities/historial.schema';

@Controller('historial')
export class HistorialController {
  constructor(private readonly historialService: HistorialService) {}

  @Post()
  create(@Body() data: Partial<Historial>) {
    return this.historialService.create(data);
  }

  @Get()
  findAll() {
    return this.historialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historialService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Historial>) {
    return this.historialService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historialService.delete(id);
  }
}
