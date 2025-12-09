import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CategoriaProveedor } from './categoria-proveedor.entity';
import { Estado } from '../../estado/entities/estado.entity';

@Entity('proveedor') // es para especificar el nombre de la tabla en la base de datos
export class Proveedor {
  // aca definimos las columnas de la tabla proveedor
  @PrimaryGeneratedColumn()
  id_proveedor: number;

  @Column({ length: 15 })
  ruc: string;

  @Column({ length: 150 })
  razon_social: string;

  @Column({ length: 200, nullable: true })
  direccion?: string;

  @Column({ length: 20, nullable: true })
  telefono?: string;

  @Column({ length: 100, nullable: true })
  email?: string;

  @Column({ length: 100, nullable: true })
  contacto_principal?: string;

  @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
  calificacion_promedio?: number;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;

  // ====== CATEGORÍA DEL PROVEEDOR ======
  @ManyToOne(() => CategoriaProveedor, (categoria) => categoria.proveedores)
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriaProveedor;

  // ====== ESTADO DEL PROVEEDOR (NORMALIZADO) ======
  @ManyToOne(() => Estado)
  @JoinColumn({ name: 'id_estado' })
  estado: Estado;
}
