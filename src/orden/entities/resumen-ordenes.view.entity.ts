import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'vista_resumen_ordenes' })
export class VistaResumenOrdenes {
  @ViewColumn() completadas: number;
  @ViewColumn() pendientes: number;
  @ViewColumn() canceladas: number;
  @ViewColumn() total_mes_actual: number;
  @ViewColumn() total_mes_anterior: number;
  @ViewColumn() variacion_mes_vs_mes_anterior_pct: number | null;
}
