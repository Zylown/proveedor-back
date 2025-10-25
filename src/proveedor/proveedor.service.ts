import {
  CreateProveedorDto,
  CreateProveedorDtoType,
} from './dto/create-proveedor.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Proveedor } from './proveedor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProveedorService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
  ) {}

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

  // Delete proveedor
  async deleteProveedor(id: number): Promise<void> {
    const resultado = await this.proveedorRepo.delete(id);
    if (resultado.affected === 0) {
      // Ningún registro fue eliminado
      throw new NotFoundException(`Proveedor con ID ${id} no encontrado`);
    }
  }

  //Total de proveedores
  async countProveedores(): Promise<number> {
    return this.proveedorRepo.count();
  }
}
