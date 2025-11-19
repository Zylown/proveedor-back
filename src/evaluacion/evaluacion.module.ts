import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvaluacionProveedor } from './entities/evaluacion.entity';
import { VistaResumenEvaluaciones } from './entities/resumen-evaluaciones.view.entity';
import { EvaluacionController } from './evaluacion.controller';
import { EvaluacionService } from './evaluacion.service';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EvaluacionProveedor,
      Proveedor,
      VistaResumenEvaluaciones,
    ]),
  ],
  controllers: [EvaluacionController],
  providers: [EvaluacionService],
})
export class EvaluacionModule {}
