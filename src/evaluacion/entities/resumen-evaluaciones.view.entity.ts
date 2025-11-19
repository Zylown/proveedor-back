import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'vista_resumen_evaluaciones' })
export class VistaResumenEvaluaciones {
  @ViewColumn()
  promedio_general: number;

  @ViewColumn()
  promedio_calidad: number;

  @ViewColumn()
  promedio_entrega: number;

  @ViewColumn()
  promedio_precio: number;

  @ViewColumn()
  top_id_proveedor: number;

  @ViewColumn()
  top_proveedor: string;

  @ViewColumn()
  top_puntaje: number;
}
