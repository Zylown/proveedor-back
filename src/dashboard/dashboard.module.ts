import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VistaDashboardKpis } from 'src/dashboard/entities/dashboard-kpis.view.entity';
import { VistaActividadReciente } from './entities/actividad-reciente.view.entity';
import { VistaProveedoresDestacadosMes } from './entities/proveedores-destacados.view.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VistaDashboardKpis,
      VistaActividadReciente,
      VistaProveedoresDestacadosMes,
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
