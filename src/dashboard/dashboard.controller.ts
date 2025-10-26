import { DashboardService } from './dashboard.service';
import { Controller, Get } from '@nestjs/common';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly DashboardService: DashboardService) {}

  @Get('kpis')
  async obtenerKpis() {
    return this.DashboardService.obtenerKpis();
  }
}
