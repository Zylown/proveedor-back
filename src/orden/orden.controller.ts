import { Controller, Get } from '@nestjs/common';
import { OrdersService } from './orden.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}

  // Lista “Órdenes Registradas”
  @Get()
  async listAll() {
    return this.service.listAll();
  }

  // “Resumen de Órdenes”
  @Get('resumen')
  async summary() {
    return this.service.summary();
  }
}
