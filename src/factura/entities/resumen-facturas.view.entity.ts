import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'vista_resumen_facturas' })
export class VistaResumenFacturas {
  @ViewColumn() pagadas: number;
  @ViewColumn() pendientes: number;
  @ViewColumn() vencidas: number;
  @ViewColumn() total_ingresado: string; // numeric -> string
}
