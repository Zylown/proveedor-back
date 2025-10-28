import { Controller, Get } from '@nestjs/common';
import { EntregaService } from './entrega.service';

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
}
