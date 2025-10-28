import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VistaResumenOrdenes } from './entities/resumen-ordenes.view.entity';
import { OrdenCompra } from './entities/orden-compra.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdenCompra)
    private readonly ordersRepo: Repository<OrdenCompra>,
    @InjectRepository(VistaResumenOrdenes)
    private readonly resumenRepo: Repository<VistaResumenOrdenes>,
  ) {}

  // A) Órdenes registradas (todas). Si crece, añade paginación opcional.
  async listAll() {
    const items = await this.ordersRepo.find({
      order: { fecha_emision: 'DESC' },
      relations: ['proveedor'],
    });

    return items.map((i) => ({
      numero_orden: i.numero_orden,
      proveedor: i.proveedor?.razon_social ?? null,
      monto: i.monto_total ? Number(i.monto_total) : 0,
      estado: i.estado,
      fecha: i.fecha_emision,
      moneda: i.moneda ?? 'PEN',
    }));
  }

  // B) Resumen de órdenes (desde la vista)
  async summary() {
    const row = (await this.resumenRepo.find())[0];
    if (!row) {
      return {
        completadas: 0,
        pendientes: 0,
        canceladas: 0,
        variacionMesVsMesAnteriorPct: 0,
      };
    }
    return {
      completadas: row.completadas,
      pendientes: row.pendientes,
      canceladas: row.canceladas,
      variacionMesVsMesAnteriorPct: row.variacion_mes_vs_mes_anterior_pct,
    };
  }
}
