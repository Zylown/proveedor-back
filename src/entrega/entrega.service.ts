import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VistaResumenEntregas } from './entities/resumen-entregas.view.entity';
import { Entrega } from './entities/entrega.entity';

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
}
