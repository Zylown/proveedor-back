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
  Query,
} from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { ListProveedorQueryDto } from './dto/query-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Controller('proveedor')
export class ProveedorController {
  // Aquí irán los endpoints relacionados con Proveedor
  constructor(private readonly proveedorService: ProveedorService) {}

  // === Listado paginado con filtros (recomendado para UI de tabla) ===
  @Get()
  async findAllPaged(@Query() q: any) {
    const parsed = ListProveedorQueryDto.safeParse(q);
    if (!parsed.success) {
      const errores = parsed.error.issues.map((e) => e.message).join(', ');
      throw new BadRequestException(`Query inválida: ${errores}`);
    }
    return this.proveedorService.findAllPaged(parsed.data);
  }

  // === Obtener por ID ===
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proveedorService.findOne(id);
  }

  // === Listar con categoría (simple) ===
  @Get('listar/con-categoria/lista-completa')
  async listarProveedores() {
    return this.proveedorService.listarProveedores();
  }

  // === Crear ===
  @Post()
  @HttpCode(201)
  async createProveedor(@Body() body: any) {
    const result = CreateProveedorDto.safeParse(body);
    if (!result.success) {
      const errores = result.error.issues.map((err) => err.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }
    return this.proveedorService.createProveedor(result.data);
  }

  // === Actualizar parcial ===
  @Patch(':id')
  async updateProveedor(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: any,
  ) {
    const result = UpdateProveedorDto.safeParse(body);
    if (!result.success) {
      const errores = result.error.issues.map((err) => err.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }
    return this.proveedorService.updateProveedor(id, result.data);
  }

  // === Eliminar ===
  @Delete(':id')
  @HttpCode(204)
  async deleteProveedor(@Param('id', ParseIntPipe) id: number) {
    await this.proveedorService.deleteProveedor(id);
    return;
  }
}
