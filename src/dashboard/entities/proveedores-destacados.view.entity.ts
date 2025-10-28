import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'vista_proveedores_destacados_mes' })
export class VistaProveedoresDestacadosMes {
  @ViewColumn() id_proveedor: number;
  @ViewColumn() razon_social: string; // ConcreMix Perú SAC
  @ViewColumn() ordenes_completadas_mes: number; // 1
  @ViewColumn() total_entregas_mes: number; // 1
  @ViewColumn() puntualidad_pct_mes: number | null; // 0-100
  @ViewColumn() calidad_promedio_mes: string | null; // numeric -> string // 0 a 100
}
