import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VistaDashboard } from 'src/entities/dashboard.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(VistaDashboard) // Inyecta el repositorio de la vista
    private readonly dashboardRepo: Repository<VistaDashboard>,
  ) {}

  async obtenerKpis(): Promise<VistaDashboard | null> {
    // Retorna los KPIs del dashboard o null si no hay datos
    const data = await this.dashboardRepo.find(); // Obtiene todos los registros de la vista
    return data.length ? data[0] : null;
  }
}
