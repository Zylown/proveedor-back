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
import { EntregaService } from './entrega.service';
import { UpdateEntregaDto } from './dto/update-entrega.dto';
import { CreateEntregaDto } from './dto/create-entrega.dto';

@Controller('entrega')
export class EntregaController {
  constructor(private readonly service: EntregaService) {}

  // Lista “Entregas Registradas”
  @Get()
  async listAll() {
    return this.service.listAll();
  }

  // “Resumen de Entregas”
  @Get('resumen')
  async summary() {
    return this.service.summary();
  }

  // B) Obtener por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // C) Crear nueva entrega
  @Post()
  @HttpCode(201)
  async create(@Body() body: any) {
    const parsed = CreateEntregaDto.safeParse(body);
    if (!parsed.success) {
      const errores = parsed.error.issues.map((e) => e.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }
    return this.service.create(parsed.data);
  }

  // D) Actualizar entrega
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const parsed = UpdateEntregaDto.safeParse(body);
    if (!parsed.success) {
      const errores = parsed.error.issues.map((e) => e.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }
    return this.service.update(id, parsed.data);
  }

  // E) Eliminar
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
    return;
  }
}
