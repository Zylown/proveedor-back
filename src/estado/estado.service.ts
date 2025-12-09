import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estado } from './entities/estado.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoService {
  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepo: Repository<Estado>,
  ) {}

  async findSelect() {
    return this.estadoRepo.find({
      select: ['id_estado', 'nombre'],
      order: { nombre: 'ASC' },
    });
  }

  async findAll() {
    return this.estadoRepo.find();
  }
}
