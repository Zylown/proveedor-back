import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({
  name: 'vista_dashboard',
})
export class VistaDashboard {
  @ViewColumn()
  ordenes_activas: number;

  @ViewColumn()
  nuevas_hoy: number;

  @ViewColumn()
  entregas_pendientes: number;

  @ViewColumn()
  retrasadas: number;

  @ViewColumn()
  pagos_pendientes: number;

  @ViewColumn()
  facturas_vencidas: number;
}
