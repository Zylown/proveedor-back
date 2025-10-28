import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VistaResumenFacturas } from './entities/resumen-facturas.view.entity';
import { Factura } from './entities/factura.entity';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepo: Repository<Factura>,
    @InjectRepository(VistaResumenFacturas)
    private readonly resumenRepo: Repository<VistaResumenFacturas>,
  ) {}

  // A) Facturas Registradas (todas) con proveedor
  async listAll() {
    const rows = await this.facturaRepo
      .createQueryBuilder('f')
      .leftJoinAndSelect('f.orden', 'o')
      .leftJoin('o.proveedor', 'p')
      .addSelect(['p.razon_social'])
      .orderBy('f.fecha_emision', 'DESC')
      .getMany();

    const today = new Date();

    return rows.map((f) => {
      const proveedor = f.orden?.proveedor?.razon_social ?? null;
      const monto = f.monto_total ? Number(f.monto_total) : 0;

      // Estado de presentación para la lista
      let estadoLabel = '—';
      if ((f.estado ?? '').toLowerCase() === 'pagada') {
        estadoLabel = 'Pagado';
      } else if ((f.estado ?? '').toLowerCase() === 'pendiente') {
        // Si está pendiente y vencida por fecha => Vencido
        const vencidaPorFecha =
          f.fecha_vencimiento != null &&
          new Date(f.fecha_vencimiento) < new Date(today.toDateString());
        estadoLabel = vencidaPorFecha ? 'Vencido' : 'Pendiente';
      } else if ((f.estado ?? '').toLowerCase() === 'vencida') {
        estadoLabel = 'Vencido';
      }

      return {
        numero_factura: f.numero_factura,
        proveedor,
        monto,
        estado: estadoLabel, // "Pagado" | "Pendiente" | "Vencido"
        fecha: f.fecha_emision, // YYYY-MM-DD (Date)
        moneda: 'PEN', // si necesitas leer moneda desde la orden, puedes traer o.moneda
      };
    });
  }

  // B) Resumen Financiero desde la vista
  async summary() {
    const row = (await this.resumenRepo.find())[0];
    if (!row) {
      return { pagadas: 0, pendientes: 0, vencidas: 0, totalIngresado: 0 };
    }
    return {
      pagadas: row.pagadas,
      pendientes: row.pendientes,
      vencidas: row.vencidas,
      totalIngresado: Number(row.total_ingresado || 0),
    };
  }
}
