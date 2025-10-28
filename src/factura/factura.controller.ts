import { Controller, Get } from '@nestjs/common';
import { FacturaService } from './factura.service';

@Controller('Factura')
export class FacturaController {
  constructor(private readonly service: FacturaService) {}

  // Lista “Facturas Registradas”
  @Get()
  async listAll() {
    return this.service.listAll();
  }

  // “Resumen Financiero”
  @Get('resumen')
  async summary() {
    return this.service.summary();
  }
}
