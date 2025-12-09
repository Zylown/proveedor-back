import { CreateProveedorDtoType } from './dto/create-proveedor.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './entities/proveedor.entity';
import { Repository } from 'typeorm';
import { ListProveedorQueryDtoType } from './dto/query-proveedor.dto';
import { UpdateProveedorDtoType } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
  ) {}

  async findAllPaged(query: ListProveedorQueryDtoType) {
    const { page, limit, search, categoriaId, sortBy, order } = query;

    const qb = this.proveedorRepo
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.categoria', 'c')
      .leftJoinAndSelect('p.estado', 'e'); // ← AGREGADO

    if (search?.trim()) {
      qb.andWhere(
        '(p.razon_social ILIKE :s OR p.ruc ILIKE :s OR p.email ILIKE :s OR p.telefono ILIKE :s)',
        { s: `%${search.trim()}%` },
      );
    }

    if (categoriaId) {
      qb.andWhere('c.id_categoria = :categoriaId', { categoriaId });
    }

    const sortCol =
      sortBy === 'razon_social'
        ? 'p.razon_social'
        : sortBy === 'calificacion_promedio'
          ? 'p.calificacion_promedio'
          : 'p.fecha_creacion';

    qb.orderBy(sortCol, order.toUpperCase() as 'ASC' | 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    const [items, total] = await qb.getManyAndCount();

    return {
      total,
      page,
      limit,
      items,
    };
  }

  // Obtener todos los proveedores
  findAll(): Promise<Proveedor[]> {
    return this.proveedorRepo.find();
  }

  // Obtener un proveedor por ID
  async findOne(id: number): Promise<Proveedor> {
    const proveedor = await this.proveedorRepo.findOne({
      where: { id_proveedor: id },
    });

    if (!proveedor) {
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }

    return proveedor;
  }

  // Otros métodos como create, update, delete pueden ser añadidos aquí
  async createProveedor(data: CreateProveedorDtoType): Promise<Proveedor> {
    // const result = CreateProveedorDto.safeParse(data);
    // if (!result.success) {
    //   const errores = result.error.issues.map((err) => err.message).join(', ');
    //   throw new BadRequestException(`Error de validación: ${errores}`);
    // }
    try {
      const nuevoProveedor = this.proveedorRepo.create(data);
      return await this.proveedorRepo.save(nuevoProveedor);
    } catch (error) {
      // Por ejemplo, manejar error de clave duplicada
      if (error.code === '23505') {
        throw new ConflictException('El proveedor ya existe');
      }
      throw new InternalServerErrorException('Error al crear proveedor');
    }
  }

  // === Actualizar ===
  async updateProveedor(
    id: number,
    data: UpdateProveedorDtoType,
  ): Promise<Proveedor> {
    const current = await this.proveedorRepo.findOne({
      where: { id_proveedor: id },
    });
    if (!current)
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);

    // Validar RUC duplicado si se envía y cambia
    if (data.ruc && data.ruc !== current.ruc) {
      const exists = await this.proveedorRepo.findOne({
        where: { ruc: data.ruc },
      });
      if (exists)
        throw new ConflictException('Ya existe un proveedor con ese RUC');
    }

    // Validar email duplicado si cambia
    if (data.email && data.email !== current.email) {
      const emailExists = await this.proveedorRepo.findOne({
        where: { email: data.email },
      });
      if (emailExists)
        throw new ConflictException('El email de proveedor ya existe');
    }

    // Mapear id_categoria si viene
    const payload: Partial<Proveedor> = {
      ...current,
      ...data,
      ...(data.id_categoria
        ? { categoria: { id_categoria: data.id_categoria } as any }
        : {}),
    };

    const saved = await this.proveedorRepo.save(payload);
    return saved;
  }

  // Delete proveedor
  async deleteProveedor(id: number): Promise<void> {
    const resultado = await this.proveedorRepo.delete(id);
    if (resultado.affected === 0) {
      // Ningún registro fue eliminado
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
  }

  // Listar proveedores con su categoría
  async listarProveedores() {
    return this.proveedorRepo.find({ relations: ['categoria', 'estado'] });
  }
}
