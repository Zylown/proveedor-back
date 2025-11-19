import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { CreateEvaluacionDto } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDto } from './dto/update-evaluacion.dto';

@Controller('evaluacion')
export class EvaluacionController {
  constructor(private readonly service: EvaluacionService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('resumen')
  async resumen() {
    return this.service.resumen();
  }

  @Get('proveedor/:id')
  findByProveedor(@Param('id', ParseIntPipe) id: number) {
    return this.service.findByProveedor(id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    const result = CreateEvaluacionDto.safeParse(body);
    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(', ');
      throw new BadRequestException(message);
    }
    return this.service.create(result.data);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    const result = UpdateEvaluacionDto.safeParse(body);
    if (!result.success) {
      const message = result.error.issues.map((i) => i.message).join(', ');
      throw new BadRequestException(message);
    }
    return this.service.update(id, result.data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
