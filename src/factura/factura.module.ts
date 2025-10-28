import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { VistaResumenFacturas } from './entities/resumen-facturas.view.entity';
import { FacturaController } from './factura.controller';
import { FacturaService } from './factura.service';

@Module({
  imports: [TypeOrmModule.forFeature([Factura, VistaResumenFacturas])],
  controllers: [FacturaController],
  providers: [FacturaService],
})
export class FacturaModule {}
