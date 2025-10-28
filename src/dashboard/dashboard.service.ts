import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VistaDashboardKpis } from 'src/dashboard/entities/dashboard-kpis.view.entity';
import { Repository } from 'typeorm';
import { VistaActividadReciente } from './entities/actividad-reciente.view.entity';
import { VistaProveedoresDestacadosMes } from './entities/proveedores-destacados.view.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(VistaDashboardKpis) // Inyecta el repositorio de la vista
    private readonly dashboardRepo: Repository<VistaDashboardKpis>,
    @InjectRepository(VistaActividadReciente)
    private readonly actividadRecienteRepo: Repository<VistaActividadReciente>,
    @InjectRepository(VistaProveedoresDestacadosMes)
    private readonly proveedoresDestacadosRepo: Repository<VistaProveedoresDestacadosMes>,
  ) {}

  // Método para obtener los KPIs del dashboard 1 que ya funciona
  async obtenerKpis(): Promise<VistaDashboardKpis | null> {
    // Retorna los KPIs del dashboard o null si no hay datos
    // const data = await this.dashboardRepo.find(); // Obtiene todos los registros de la vista
    // return data.length ? data[0] : null;
    const row = (await this.dashboardRepo.find())[0];
    if (!row) return null;

    return {
      total_proveedores: row.total_proveedores,
      variacion_proveedores_mes_pct: row.variacion_proveedores_mes_pct,
      ordenes_activas: row.ordenes_activas,
      nuevas_hoy: row.nuevas_hoy,
      entregas_pendientes: row.entregas_pendientes,
      retrasadas: row.retrasadas,
      pagos_pendientes: Number(row.pagos_pendientes ?? 0).toString(), // Asegura que sea string aunque sea '0'
      facturas_vencidas: row.facturas_vencidas,
    };
  }

  // === ACTIVIDAD RECIENTE: SOLO 3 HIGHLIGHTS ===
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

    // Devuelve shape directo para la card (frontend ya formatea "hace X" con v.ts)
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
            subtitulo: ultimaEntregaRetrasada.subtitulo, // "Orden #... - Estimado: DD/MM/YYYY"
            ts: ultimaEntregaRetrasada.ts,
            numero_orden: ultimaEntregaRetrasada.numero_orden,
            proveedor: ultimaEntregaRetrasada.proveedor,
          }
        : null,
      ultimoProveedorNuevo: ultimoProveedorNuevo
        ? {
            titulo: ultimoProveedorNuevo.titulo, // "Nuevo proveedor registrado"
            subtitulo: ultimoProveedorNuevo.subtitulo, // razón social
            ts: ultimoProveedorNuevo.ts,
            proveedor: ultimoProveedorNuevo.proveedor,
          }
        : null,
    };
  }

  // Obtener proveedores destacados del mes
  async getFeatured() {
    const all = await this.proveedoresDestacadosRepo.find();

    const mejorDesempeno = [...all] // clonar el array antes de ordenar
      .sort((a, b) => b.ordenes_completadas_mes - a.ordenes_completadas_mes) // ordenar desc por ordenes completadas
      .slice(0, 3); // tomar los top 3 proveedores destacados

    const mejorPuntualidad = [...all]
      .filter((x) => x.puntualidad_pct_mes !== null)
      .sort((a, b) => b.puntualidad_pct_mes! - a.puntualidad_pct_mes!)
      .slice(0, 3);

    const mejorCalidad = [...all]
      .filter((x) => x.calidad_promedio_mes !== null)
      .sort(
        (a, b) =>
          Number(b.calidad_promedio_mes) - Number(a.calidad_promedio_mes),
      )
      .slice(0, 3);

    return { mejorDesempeno, mejorPuntualidad, mejorCalidad };
  }
}
