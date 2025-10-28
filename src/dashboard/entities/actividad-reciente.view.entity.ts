import { ViewEntity, ViewColumn } from 'typeorm';

@ViewEntity({ name: 'vista_actividad_reciente' })
export class VistaActividadReciente {
  @ViewColumn() tipo:
    | 'orden_completada'
    | 'entrega_retrasada'
    | 'proveedor_nuevo';
  @ViewColumn() id_ref: number | null;
  @ViewColumn() numero_orden: string | null; // OC-2025-0001
  @ViewColumn() proveedor: string | null; // ConcreMix Perú SAC
  @ViewColumn() ts: Date; // timestamp de la actividad
  @ViewColumn() titulo: string; //Entrega retrasada
  @ViewColumn() subtitulo: string; // Orden #OC-2025-0001 - Estimado: 27/10/2025
}
