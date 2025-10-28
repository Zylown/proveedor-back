import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'vista_resumen_entregas' })
export class VistaResumenEntregas {
  @ViewColumn() entregadas: number;
  @ViewColumn() en_transito: number;
  @ViewColumn() retrasadas: number;
  @ViewColumn() canceladas: number;
}
