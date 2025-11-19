import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Entity('categoria_proveedor')
export class CategoriaProveedor {
  @PrimaryGeneratedColumn()
  id_categoria: number;

  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  descripcion?: string | null;

  @Column({ type: 'varchar', length: 20 })
  estado: string; // activo | inactivo

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_actualizacion: Date;

  // Relación inversa: una categoría tiene muchos proveedores
  @OneToMany(() => Proveedor, (proveedor) => proveedor.categoria)
  proveedores: Proveedor[];
}
