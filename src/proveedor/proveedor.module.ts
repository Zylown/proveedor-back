import { Module } from '@nestjs/common';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proveedor } from '../entities/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proveedor])], // Importa la entidad Proveedor para usarla en el módulo
  controllers: [ProveedorController],
  providers: [ProveedorService],
})
export class ProveedorModule {}
