import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orden_compra')
export class OrdenCompra {
  @PrimaryGeneratedColumn()
  id_orden: number;

  @Column({ type: 'varchar', length: 20 })
  numero_orden: string;

  @Column({ type: 'date' })
  fecha_emision: Date;

  @Column({ type: 'date', nullable: true })
  fecha_entrega_esperada?: Date; // sin union, solo optional

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  monto_total?: string; // numeric -> string en JS

  @Column({ type: 'varchar', length: 10, nullable: true })
  moneda?: string; // <--- antes “Object”; ahora varchar explícito

  @Column({ type: 'varchar', length: 100, nullable: true })
  terminos_pago?: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  estado?: string; // 'pendiente' | 'completada' | 'cancelada'...

  @ManyToOne(() => Proveedor, { eager: true })
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_actualizacion: Date;
}
