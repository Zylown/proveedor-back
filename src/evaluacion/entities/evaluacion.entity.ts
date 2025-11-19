import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';

@Entity('evaluacion_proveedor')
export class EvaluacionProveedor {
  @PrimaryGeneratedColumn()
  id_evaluacion: number;

  @Column({ type: 'date' })
  fecha: Date;

  @Column({ type: 'integer', nullable: true })
  calidad?: number | null; // 1–10

  @Column({ type: 'integer', nullable: true })
  puntualidad?: number | null;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: true })
  precio?: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  servicio?: string | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observaciones?: string | null;

  @ManyToOne(() => Proveedor, { eager: true })
  @JoinColumn({ name: 'id_proveedor' })
  proveedor: Proveedor;

  @CreateDateColumn({ type: 'timestamptz' })
  fecha_creacion: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  fecha_actualizacion: Date;
}
