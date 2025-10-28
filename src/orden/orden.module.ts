import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './orden.controller';
import { OrdersService } from './orden.service';
import { VistaResumenOrdenes } from './entities/resumen-ordenes.view.entity';
import { OrdenCompra } from './entities/orden-compra.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrdenCompra, VistaResumenOrdenes])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdenModule {}
