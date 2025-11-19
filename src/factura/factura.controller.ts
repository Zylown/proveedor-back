import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { FacturaService } from './factura.service';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';

@Controller('factura')
export class FacturaController {
  constructor(private readonly service: FacturaService) {}

  // A) Listar todas las facturas registradas
  @Get()
  async listAll() {
    return this.service.listAll();
  }

  // B) Resumen financiero
  @Get('resumen')
  async summary() {
    return this.service.summary();
  }

  // C) Obtener factura por ID
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  // D) Crear factura
  @Post()
  async create(@Body() body: any) {
    const result = CreateFacturaDto.safeParse(body);
    if (!result.success) {
      const errores = result.error.issues.map((e) => e.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }

    return this.service.create(result.data);
  }

  // E) Actualizar factura
  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const result = UpdateFacturaDto.safeParse(body);
    if (!result.success) {
      const errores = result.error.issues.map((e) => e.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }

    return this.service.update(id, result.data);
  }

  // F) Eliminar factura
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
