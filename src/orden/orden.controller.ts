import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { OrdersService } from './orden.service';
import { CreateOrdenDto } from './dto/create-orden.dto';
import { UpdateOrdenDto } from './dto/update-orden.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  // Lista “Órdenes Registradas”
  @Get()
  async listAll() {
    return this.service.listAll();
  }

  // Obtener una orden por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // Crear nueva orden
  @Post()
  @HttpCode(201)
  async create(@Body() body: any) {
    const parsed = CreateOrdenDto.safeParse(body);
    if (!parsed.success) {
      const errores = parsed.error.issues.map((e) => e.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }
    return this.service.create(parsed.data);
  }

  // Actualizar orden (parcial)
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const parsed = UpdateOrdenDto.safeParse(body);
    if (!parsed.success) {
      const errores = parsed.error.issues.map((e) => e.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }
    return this.service.update(id, parsed.data);
  }

  // Eliminar orden
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
    return;
  }

  // “Resumen de Órdenes”
  @Get('resumen')
  async summary() {
    return this.service.summary();
  }
}
