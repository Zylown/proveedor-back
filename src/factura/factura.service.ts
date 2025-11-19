import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VistaResumenFacturas } from './entities/resumen-facturas.view.entity';
import { Factura } from './entities/factura.entity';
import { UpdateFacturaDtoType } from './dto/update-factura.dto';
import { CreateFacturaDtoType } from './dto/create-factura.dto';

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
      const rawEstado = (f.estado ?? '').toLowerCase();

      if (rawEstado === 'pagada') {
        estadoLabel = 'Pagado';
      } else if (rawEstado === 'pendiente') {
        // Si está pendiente y vencida por fecha => Vencido
        const vencidaPorFecha =
          f.fecha_vencimiento != null &&
          new Date(f.fecha_vencimiento) < new Date(today.toDateString());
        estadoLabel = vencidaPorFecha ? 'Vencido' : 'Pendiente';
      } else if (rawEstado === 'vencida') {
        estadoLabel = 'Vencido';
      }

      return {
        numero_factura: f.numero_factura,
        proveedor,
        monto,
        estado: estadoLabel, // "Pagado" | "Pendiente" | "Vencido"
        fecha: f.fecha_emision, // Date
        moneda: f.moneda ?? 'PEN',
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

  // C) Obtener factura por ID
  async findOne(id: number) {
    const factura = await this.facturaRepo.findOne({
      where: { id_factura: id },
      relations: ['proveedor', 'orden'],
    });

    if (!factura) throw new NotFoundException('Factura no encontrada');
    return factura;
  }

  // D) Crear factura  ✅ corregido
  async create(data: CreateFacturaDtoType) {
    const nuevo = this.facturaRepo.create({
      numero_factura: data.numero_factura ?? null,
      monto_total:
        typeof data.monto_total === 'number'
          ? data.monto_total.toString()
          : null,
      moneda: data.moneda ?? 'PEN', // respeta default si no se envía
      fecha_emision: new Date(data.fecha_emision),
      fecha_vencimiento: data.fecha_vencimiento
        ? new Date(data.fecha_vencimiento)
        : null,
      igv: typeof data.igv === 'number' ? data.igv.toString() : null,
      estado: data.estado ?? 'pendiente',
      proveedor: { id_proveedor: data.id_proveedor } as any,
      orden: data.id_orden ? ({ id_orden: data.id_orden } as any) : undefined,
    });

    return await this.facturaRepo.save(nuevo);
  }

  // E) Actualizar factura ✅ corregido
  async update(id: number, data: UpdateFacturaDtoType) {
    const actual = await this.facturaRepo.findOne({
      where: { id_factura: id },
    });
    if (!actual) throw new NotFoundException('Factura no encontrada');

    if (data.numero_factura !== undefined)
      actual.numero_factura = data.numero_factura;

    if (data.monto_total !== undefined)
      actual.monto_total = data.monto_total.toString();

    if (data.moneda !== undefined) actual.moneda = data.moneda;

    if (data.fecha_emision !== undefined)
      actual.fecha_emision = new Date(data.fecha_emision);

    if (data.fecha_vencimiento !== undefined)
      actual.fecha_vencimiento = data.fecha_vencimiento
        ? new Date(data.fecha_vencimiento)
        : null;

    if (data.igv !== undefined) actual.igv = data.igv.toString();

    if (data.estado !== undefined) actual.estado = data.estado;

    if (data.id_proveedor !== undefined)
      (actual as any).proveedor = { id_proveedor: data.id_proveedor };

    if (data.id_orden !== undefined)
      (actual as any).orden = { id_orden: data.id_orden };

    return this.facturaRepo.save(actual);
  }

  // F) Eliminar
  async delete(id: number) {
    const r = await this.facturaRepo.delete(id);
    if (!r.affected) {
      throw new NotFoundException('Factura no encontrada');
    }
  }
}
