import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EvaluacionProveedor } from './entities/evaluacion.entity';
import { CreateEvaluacionDtoType } from './dto/create-evaluacion.dto';
import { UpdateEvaluacionDtoType } from './dto/update-evaluacion.dto';
import { VistaResumenEvaluaciones } from './entities/resumen-evaluaciones.view.entity';

@Injectable()
export class EvaluacionService {
  constructor(
    @InjectRepository(EvaluacionProveedor)
    private readonly evalRepo: Repository<EvaluacionProveedor>,

    @InjectRepository(VistaResumenEvaluaciones)
    private readonly resumenRepo: Repository<VistaResumenEvaluaciones>,
  ) {}

  // Listar todas
  async findAll() {
    return this.evalRepo.find({
      order: { fecha: 'DESC' },
    });
  }

  // Listar evaluaciones por proveedor
  async findByProveedor(id_proveedor: number) {
    return this.evalRepo.find({
      where: { proveedor: { id_proveedor } },
      order: { fecha: 'DESC' },
    });
  }

  // Obtener por ID
  async findOne(id: number) {
    const evaluacion = await this.evalRepo.findOne({
      where: { id_evaluacion: id },
    });
    if (!evaluacion) throw new NotFoundException('Evaluación no encontrada');
    return evaluacion;
  }

  // Crear
  async create(data: CreateEvaluacionDtoType) {
    const nueva = this.evalRepo.create({
      fecha: new Date(data.fecha),
      calidad: data.calidad,
      puntualidad: data.puntualidad,
      precio: data.precio?.toString() ?? null,
      servicio: data.servicio,
      observaciones: data.observaciones,
      proveedor: { id_proveedor: data.id_proveedor } as any,
    });

    return this.evalRepo.save(nueva);
  }

  // Actualizar
  async update(id: number, data: UpdateEvaluacionDtoType) {
    const actual = await this.findOne(id);

    if (data.fecha) actual.fecha = new Date(data.fecha);
    if (data.calidad !== undefined) actual.calidad = data.calidad;
    if (data.puntualidad !== undefined) actual.puntualidad = data.puntualidad;
    if (data.precio !== undefined) actual.precio = data.precio.toString();
    if (data.servicio !== undefined) actual.servicio = data.servicio;
    if (data.observaciones !== undefined)
      actual.observaciones = data.observaciones;
    if (data.id_proveedor !== undefined)
      (actual as any).proveedor = { id_proveedor: data.id_proveedor };

    return this.evalRepo.save(actual);
  }

  // Eliminar
  async delete(id: number) {
    const r = await this.evalRepo.delete(id);
    if (!r.affected) throw new NotFoundException('Evaluación no encontrada');
  }

  // ✔ Resumen desde la vista
  async resumen() {
    const row = (await this.resumenRepo.find())[0];
    return (
      row ?? {
        promedio_general: 0,
        promedio_calidad: 0,
        promedio_entrega: 0,
        promedio_precio: 0,
        top_id_proveedor: null,
        top_proveedor: null,
        top_puntaje: 0,
      }
    );
  }
}
