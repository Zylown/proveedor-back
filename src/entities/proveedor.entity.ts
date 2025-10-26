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

  @Column({ length: 20, nullable: true })
  estado?: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  fecha_actualizacion: Date;

  // Relaciones con otras entidades (si las hay)
  @ManyToOne(() => CategoriaProveedor, (categoria) => categoria.proveedores)
  @JoinColumn({ name: 'id_categoria' })
  categoria: CategoriaProveedor;

  //   @OneToMany(() => EvaluacionProveedor, evaluacion => evaluacion.id_proveedor)
  //   evaluaciones: EvaluacionProveedor[];

  //   @OneToMany(() => OrdenCompra, orden => orden.id_proveedor)
  //   ordenes: OrdenCompra[];
}
