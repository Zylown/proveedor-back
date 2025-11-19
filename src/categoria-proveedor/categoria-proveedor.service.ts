import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaProveedor } from './entities/categoria-proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriaProveedorService {
  constructor(
    @InjectRepository(CategoriaProveedor)
    private readonly categoriaRepo: Repository<CategoriaProveedor>,
  ) {}

  findAll() {
    return this.categoriaRepo.find({
      order: { nombre: 'ASC' },
    });
  }

  async getForSelect() {
    const rows = await this.categoriaRepo.find({
      select: ['id_categoria', 'nombre'], // SOLO traemos lo necesario
      order: { nombre: 'ASC' },
    });

    return rows;
  }
}
