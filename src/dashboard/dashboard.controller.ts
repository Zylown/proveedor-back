import { DashboardService } from './dashboard.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly DashboardService: DashboardService) {}

  @Get('kpis')
  async obtenerKpis() {
    return this.DashboardService.obtenerKpis();
  }

  @Get('actividad-reciente')
  async actividadReciente() {
    return this.DashboardService.getRecentHighlights();
  }

  @Get('proveedores-destacados')
  async getFeatured() {
    return this.DashboardService.getFeatured();
  }
}
