import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntregaController } from './entrega.controller';
import { EntregaService } from './entrega.service';
import { Entrega } from './entities/entrega.entity';
import { VistaResumenEntregas } from './entities/resumen-entregas.view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entrega, VistaResumenEntregas])],
  controllers: [EntregaController],
  providers: [EntregaService],
})
export class EntregaModule {}
