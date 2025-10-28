import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proveedor } from './proveedor.entity';

@Entity('categoria_proveedor')
export class CategoriaProveedor {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 255, nullable: true })
  descripcion: string;

  @Column({ length: 20 })
  estado: string;

  @OneToMany(() => Proveedor, (proveedor) => proveedor.categoria)
  proveedores: Proveedor[];
}
