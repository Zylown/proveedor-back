import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VistaResumenOrdenes } from './entities/resumen-ordenes.view.entity';
import { OrdenCompra } from './entities/orden-compra.entity';
import { CreateOrdenDtoType } from './dto/create-orden.dto';
import { UpdateOrdenDtoType } from './dto/update-orden.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrdenCompra)
    private readonly ordersRepo: Repository<OrdenCompra>,
    @InjectRepository(VistaResumenOrdenes)
    private readonly resumenRepo: Repository<VistaResumenOrdenes>,
  ) {}

  // === A) Órdenes registradas (todas) ===
  async listAll() {
    const items = await this.ordersRepo.find({
      order: { fecha_emision: 'DESC' },
      relations: ['proveedor'],
    });

    return items.map((i) => ({
      id_orden: i.id_orden,
      numero_orden: i.numero_orden,
      proveedor: i.proveedor?.razon_social ?? null,
      monto: i.monto_total ? Number(i.monto_total) : 0,
      estado: i.estado,
      fecha: i.fecha_emision, // Date
      moneda: i.moneda ?? 'PEN',
    }));
  }

  // === B) Obtener una orden por ID ===
  async findOne(id: number): Promise<OrdenCompra> {
    const orden = await this.ordersRepo.findOne({
      where: { id_orden: id },
      relations: ['proveedor'],
    });

    if (!orden) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    return orden;
  }

  // === C) Crear orden ===
  async create(data: CreateOrdenDtoType): Promise<OrdenCompra> {
    try {
      const nueva = this.ordersRepo.create({
        numero_orden: data.numero_orden,
        fecha_emision: new Date(data.fecha_emision),
        fecha_entrega_esperada: data.fecha_entrega_esperada
          ? new Date(data.fecha_entrega_esperada)
          : undefined,
        monto_total:
          typeof data.monto_total === 'number'
            ? data.monto_total.toString()
            : undefined,
        moneda: data.moneda,
        terminos_pago: data.terminos_pago,
        estado: data.estado ?? 'pendiente',
        proveedor: { id_proveedor: data.id_proveedor } as any,
      });

      return await this.ordersRepo.save(nueva);
    } catch (error: any) {
      // 23503 = foreign_key_violation (id_proveedor inválido)
      if (error?.code === '23503') {
        throw new BadRequestException('Proveedor no válido para esta orden');
      }
      // 23505 = unique_violation (si numero_orden es UNIQUE en un futuro)
      if (error?.code === '23505') {
        throw new ConflictException('Ya existe una orden con ese número');
      }
      throw new InternalServerErrorException(
        'Error al crear la orden de compra',
      );
    }
  }

  // === D) Actualizar orden (parcial con PATCH) ===
  async update(id: number, data: UpdateOrdenDtoType): Promise<OrdenCompra> {
    const actual = await this.ordersRepo.findOne({ where: { id_orden: id } });
    if (!actual) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }

    // Relación proveedor si se envía id_proveedor
    if (data.id_proveedor) {
      (actual as any).proveedor = { id_proveedor: data.id_proveedor };
    }

    if (data.numero_orden !== undefined) {
      actual.numero_orden = data.numero_orden;
    }
    if (data.fecha_emision !== undefined) {
      actual.fecha_emision = new Date(data.fecha_emision);
    }
    if (data.fecha_entrega_esperada !== undefined) {
      actual.fecha_entrega_esperada = data.fecha_entrega_esperada
        ? new Date(data.fecha_entrega_esperada)
        : undefined;
    }
    if (data.monto_total !== undefined) {
      actual.monto_total = data.monto_total.toString();
    }
    if (data.moneda !== undefined) {
      actual.moneda = data.moneda;
    }
    if (data.terminos_pago !== undefined) {
      actual.terminos_pago = data.terminos_pago;
    }
    if (data.estado !== undefined) {
      actual.estado = data.estado;
    }

    try {
      return await this.ordersRepo.save(actual);
    } catch (error: any) {
      if (error?.code === '23503') {
        throw new BadRequestException('Proveedor no válido para esta orden');
      }
      if (error?.code === '23505') {
        throw new ConflictException('Ya existe una orden con ese número');
      }
      throw new InternalServerErrorException('Error al actualizar la orden');
    }
  }

  // === E) Eliminar orden ===
  async delete(id: number): Promise<void> {
    const result = await this.ordersRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Orden con ID ${id} no encontrada`);
    }
  }

  // === F) Resumen de órdenes (vista resumen) ===
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
