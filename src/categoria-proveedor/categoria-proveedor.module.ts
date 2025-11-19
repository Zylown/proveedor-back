import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaProveedor } from './entities/categoria-proveedor.entity';
import { CategoriaProveedorService } from './categoria-proveedor.service';
import { CategoriaProveedorController } from './categoria-proveedor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaProveedor])],
  controllers: [CategoriaProveedorController],
  providers: [CategoriaProveedorService],
})
export class CategoriaProveedorModule {}
