import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VistaDashboardKpis } from 'src/dashboard/entities/dashboard-kpis.view.entity';
import { Repository } from 'typeorm';
import { VistaActividadReciente } from './entities/actividad-reciente.view.entity';
import { VistaProveedoresDestacadosMes } from './entities/proveedores-destacados.view.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(VistaDashboardKpis)
    private readonly dashboardRepo: Repository<VistaDashboardKpis>,

    @InjectRepository(VistaActividadReciente)
    private readonly actividadRecienteRepo: Repository<VistaActividadReciente>,

    @InjectRepository(VistaProveedoresDestacadosMes)
    private readonly proveedoresDestacadosRepo: Repository<VistaProveedoresDestacadosMes>,
  ) {}

  // =============================
  //   KPIs PRINCIPALES
  // =============================
  async obtenerKpis(): Promise<VistaDashboardKpis | null> {
    const row = (await this.dashboardRepo.find())[0];
    if (!row) return null;

    return {
      total_proveedores: row.total_proveedores,
      variacion_proveedores_mes_pct: row.variacion_proveedores_mes_pct,
      ordenes_activas: row.ordenes_activas,
      nuevas_hoy: row.nuevas_hoy,
      entregas_pendientes: row.entregas_pendientes,
      retrasadas: row.retrasadas,
      pagos_pendientes: Number(row.pagos_pendientes ?? 0).toString(),
      facturas_vencidas: row.facturas_vencidas,
    };
  }

  // =============================
  //   ACTIVIDAD RECIENTE
  // =============================
  async getRecentHighlights() {
    const qb = this.actividadRecienteRepo.createQueryBuilder('v');

    const [
      ultimaOrdenCompletada,
      ultimaEntregaRetrasada,
      ultimoProveedorNuevo,
    ] = await Promise.all([
      qb
        .clone()
        .where('v.tipo = :t', { t: 'orden_completada' })
        .orderBy('v.ts', 'DESC')
        .getOne(),

      qb
        .clone()
        .where('v.tipo = :t', { t: 'entrega_retrasada' })
        .orderBy('v.ts', 'DESC')
        .getOne(),

      qb
        .clone()
        .where('v.tipo = :t', { t: 'proveedor_nuevo' })
        .orderBy('v.ts', 'DESC')
        .getOne(),
    ]);

    return {
      ultimaOrdenCompletada: ultimaOrdenCompletada
        ? {
            titulo: ultimaOrdenCompletada.titulo,
            subtitulo: ultimaOrdenCompletada.subtitulo,
            ts: ultimaOrdenCompletada.ts,
            numero_orden: ultimaOrdenCompletada.numero_orden,
            proveedor: ultimaOrdenCompletada.proveedor,
          }
        : null,

      ultimaEntregaRetrasada: ultimaEntregaRetrasada
        ? {
            titulo: ultimaEntregaRetrasada.titulo,
            subtitulo: ultimaEntregaRetrasada.subtitulo,
            ts: ultimaEntregaRetrasada.ts,
            numero_orden: ultimaEntregaRetrasada.numero_orden,
            proveedor: ultimaEntregaRetrasada.proveedor,
          }
        : null,

      ultimoProveedorNuevo: ultimoProveedorNuevo
        ? {
            titulo: ultimoProveedorNuevo.titulo,
            subtitulo: ultimoProveedorNuevo.subtitulo,
            ts: ultimoProveedorNuevo.ts,
            proveedor: ultimoProveedorNuevo.proveedor,
          }
        : null,
    };
  }

  // =============================
  //   PROVEEDORES DESTACADOS
  // =============================
  async getFeatured() {
    const all = await this.proveedoresDestacadosRepo.find();

    if (!all || all.length === 0) {
      return {
        mejorDesempeno: [],
        mejorPuntualidad: [],
        mejorCalidad: [],
        alerta: 'No hay datos registrados este mes.',
      };
    }

    // UMBRALES
    const UMBRAL = 85;

    // Score = puntualidad + calidad (si un proveedor no tiene datos, se considera 0)
    const mejorDesempeno = [...all]
      .sort((a, b) => {
        const scoreA =
          (Number(a.puntualidad_pct_mes) || 0) +
          (Number(a.calidad_promedio_mes) || 0);
        const scoreB =
          (Number(b.puntualidad_pct_mes) || 0) +
          (Number(b.calidad_promedio_mes) || 0);
        return scoreB - scoreA;
      })
      .slice(0, 3);

    const mejorPuntualidad = [...all]
      .filter((x) => x.puntualidad_pct_mes !== null)
      .sort(
        (a, b) => Number(b.puntualidad_pct_mes) - Number(a.puntualidad_pct_mes),
      )
      .slice(0, 3);

    const mejorCalidad = [...all]
      .filter((x) => x.calidad_promedio_mes !== null)
      .sort(
        (a, b) =>
          Number(b.calidad_promedio_mes) - Number(a.calidad_promedio_mes),
      )
      .slice(0, 3);

    // Detectar si ningún proveedor supera el umbral
    const hayTopReales =
      all.some((p) => Number(p.puntualidad_pct_mes) >= UMBRAL) ||
      all.some((p) => Number(p.calidad_promedio_mes) >= UMBRAL);

    return {
      mejorDesempeno,
      mejorPuntualidad,
      mejorCalidad,
      alerta: hayTopReales
        ? null
        : 'Ningún proveedor alcanzó los estándares de desempeño este mes (min. 85%).',
    };
  }
}
