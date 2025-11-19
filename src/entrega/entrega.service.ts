import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VistaResumenEntregas } from './entities/resumen-entregas.view.entity';
import { Entrega } from './entities/entrega.entity';
import { CreateEntregaDtoType } from './dto/create-entrega.dto';
import { UpdateEntregaDtoType } from './dto/update-entrega.dto';

@Injectable()
export class EntregaService {
  constructor(
    @InjectRepository(Entrega)
    private readonly entregaRepo: Repository<Entrega>,
    @InjectRepository(VistaResumenEntregas)
    private readonly resumenRepo: Repository<VistaResumenEntregas>,
  ) {}

  // A) Listar "Entregas Registradas" (todas), con proveedor y dirección
  async listAll() {
    // join manual para traer proveedor y dirección sin eager en cadena
    const rows = await this.entregaRepo
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.orden', 'o')
      .leftJoin('o.proveedor', 'p')
      .addSelect(['p.razon_social', 'p.direccion'])
      .orderBy('e.id_entrega', 'DESC')
      .getMany();

    return rows.map((r) => ({
      numero_guia: r.numero_guia ?? null,
      proveedor: r.orden?.proveedor?.razon_social ?? null,
      direccion: r.orden?.proveedor?.direccion ?? null,
      transportista: null, // no existe en el modelo actual
      estado: this.mapEstadoLabel(r.estado), // "Entregado" / "En tránsito" / "Retrasado" / "Cancelado"
      fecha: r.fecha_entrega ?? null, // para entregado; si pendiente, puedes mostrar o.fecha_entrega_esperada en el front
      numero_orden: r.orden?.numero_orden ?? null,
    }));
  }

  // === B) Obtener una entrega por ID ===
  async findOne(id: number): Promise<Entrega> {
    const entrega = await this.entregaRepo.findOne({
      where: { id_entrega: id },
      relations: ['orden', 'orden.proveedor'],
    });

    if (!entrega) {
      throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    }

    return entrega;
  }

  // B) Resumen (desde la vista)
  async summary() {
    const row = (await this.resumenRepo.find())[0];
    return (
      row ?? { entregadas: 0, en_transito: 0, retrasadas: 0, canceladas: 0 }
    );
  }

  private mapEstadoLabel(estado?: string | null) {
    switch ((estado ?? '').toLowerCase()) {
      case 'completada':
        return 'Entregado';
      case 'pendiente':
        return 'En tránsito'; // el front puede marcar "Retrasado" si estimada < hoy
      case 'cancelada':
        return 'Cancelado';
      default:
        return '—';
    }
  }

  // === C) Crear entrega ===
  async create(data: CreateEntregaDtoType): Promise<Entrega> {
    try {
      const nueva = this.entregaRepo.create({
        numero_guia: data.numero_guia,
        fecha_entrega: data.fecha_entrega
          ? new Date(data.fecha_entrega)
          : undefined,
        cantidad_recibida: data.cantidad_recibida,
        observaciones: data.observaciones,
        estado: data.estado ?? 'pendiente',
        orden: { id_orden: data.id_orden } as any,
      });

      return await this.entregaRepo.save(nueva);
    } catch (error: any) {
      if (error?.code === '23503') {
        throw new BadRequestException('Orden asociada no válida');
      }
      if (error?.code === '23505') {
        throw new ConflictException('Ya existe una entrega con esos datos');
      }
      throw new InternalServerErrorException('Error al crear la entrega');
    }
  }

  // === D) Actualizar entrega ===
  async update(id: number, data: UpdateEntregaDtoType): Promise<Entrega> {
    const actual = await this.entregaRepo.findOne({
      where: { id_entrega: id },
    });
    if (!actual) {
      throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    }

    if (data.numero_guia !== undefined) actual.numero_guia = data.numero_guia;
    if (data.fecha_entrega !== undefined)
      actual.fecha_entrega = new Date(data.fecha_entrega);
    if (data.cantidad_recibida !== undefined)
      actual.cantidad_recibida = data.cantidad_recibida;
    if (data.observaciones !== undefined)
      actual.observaciones = data.observaciones;
    if (data.estado !== undefined) actual.estado = data.estado;
    if (data.id_orden) (actual as any).orden = { id_orden: data.id_orden };

    try {
      return await this.entregaRepo.save(actual);
    } catch (error: any) {
      if (error?.code === '23503') {
        throw new BadRequestException('Orden asociada no válida');
      }
      throw new InternalServerErrorException('Error al actualizar la entrega');
    }
  }

  // === E) Eliminar entrega ===
  async delete(id: number): Promise<void> {
    const result = await this.entregaRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Entrega con ID ${id} no encontrada`);
    }
  }
}
