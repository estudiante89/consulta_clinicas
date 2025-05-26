
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.schema';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() data: Partial<Role>) {
    return this.roleService.create(data);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Role>) {
    return this.roleService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
