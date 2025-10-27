import { ViewEntity, ViewColumn } from 'typeorm';

/**
 * Vista: vista_dashboard_kpis
 * Representa los indicadores clave (KPIs) del dashboard general.
 */
@ViewEntity({ name: 'vista_dashboard_kpis' })
export class VistaDashboardKpis {
  /** Total de proveedores registrados */
  @ViewColumn()
  total_proveedores: number;

  /** Variación porcentual de nuevos proveedores respecto al mes anterior */
  @ViewColumn()
  variacion_proveedores_mes_pct: number | null;

  /** Total de órdenes activas (pendientes) */
  @ViewColumn()
  ordenes_activas: number;

  /** Órdenes nuevas emitidas hoy */
  @ViewColumn()
  nuevas_hoy: number;

  /** Total de entregas pendientes */
  @ViewColumn()
  entregas_pendientes: number;

  /** Total de entregas retrasadas */
  @ViewColumn()
  retrasadas: number;

  /** Monto total de pagos pendientes (facturas en estado pendiente) */
  @ViewColumn()
  pagos_pendientes: string; // se recibe como string desde PostgreSQL (numeric)

  /** Número total de facturas vencidas */
  @ViewColumn()
  facturas_vencidas: number;
}
