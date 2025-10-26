import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VistaDashboard } from 'src/entities/dashboard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VistaDashboard])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
