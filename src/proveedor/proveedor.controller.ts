import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDto } from './dto/create-proveedor.dto';

@Controller('proveedor')
export class ProveedorController {
  // Aquí irán los endpoints relacionados con Proveedor
  constructor(private readonly proveedorService: ProveedorService) {}

  @Get()
  async findAll() {
    return this.proveedorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // Asegura que 'id' sea un número entero el parsseIntPipe
    return this.proveedorService.findOne(id);
  }

  @Post()
  async createProveedor(@Body() body: any) {
    //Validar con zod
    const result = CreateProveedorDto.safeParse(body);
    if (!result.success) {
      const errores = result.error.issues.map((err) => err.message).join(', ');
      throw new BadRequestException(`Error de validación: ${errores}`);
    }
    return this.proveedorService.createProveedor(result.data);
  }

  @Delete(':id')
  @HttpCode(204) // Indica que la respuesta será 204 No Content
  async deleteProveedor(@Param('id', ParseIntPipe) id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('El ID debe ser un número válido');
    }
    try {
      return this.proveedorService.deleteProveedor(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
