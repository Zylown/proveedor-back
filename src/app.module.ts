import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ProveedorModule } from './proveedor/proveedor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrdenModule } from './orden/orden.module';
import { EntregaController } from './entrega/entrega.controller';
import { EntregaModule } from './entrega/entrega.module';
import { FacturaService } from './factura/factura.service';
import { FacturaController } from './factura/factura.controller';
import { FacturaModule } from './factura/factura.module';
import { EvaluacionModule } from './evaluacion/evaluacion.module';
import { CategoriaProveedorService } from './categoria-proveedor/categoria-proveedor.service';
import { CategoriaProveedorController } from './categoria-proveedor/categoria-proveedor.controller';
import { CategoriaProveedorModule } from './categoria-proveedor/categoria-proveedor.module';
import { EstadoModule } from './estado/estado.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false, // solo para desarrollo en true, luego cambiar a false porque puede causar pérdida de datos
    }),

    AuthModule,
    UsersModule,
    ProveedorModule,
    DashboardModule,
    OrdenModule,
    EntregaModule,
    FacturaModule,
    EvaluacionModule,
    CategoriaProveedorModule,
    EstadoModule,
  ],
})
export class AppModule {}
