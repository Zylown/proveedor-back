import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VistaDashboardKpis } from 'src/entities/dashboard.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(VistaDashboardKpis) // Inyecta el repositorio de la vista
    private readonly dashboardRepo: Repository<VistaDashboardKpis>,
  ) {}

  async obtenerKpis(): Promise<VistaDashboardKpis | null> {
    // Retorna los KPIs del dashboard o null si no hay datos
    const data = await this.dashboardRepo.find(); // Obtiene todos los registros de la vista
    return data.length ? data[0] : null;
  }
}
