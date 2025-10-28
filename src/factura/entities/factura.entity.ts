import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrdenCompra } from 'src/orden/entities/orden-compra.entity';

@Entity('factura')
export class Factura {
  @PrimaryGeneratedColumn()
  id_factura: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  numero_factura?: string | null;

  @Column({ type: 'date' })
  fecha_emision: Date;

  @Column({ type: 'date', nullable: true })
  fecha_vencimiento?: Date | null;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  monto_total?: string | null; // numeric -> string en JS

  @Column({ type: 'numeric', precision: 5, scale: 2, nullable: true })
  igv?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  estado?: string | null; // 'pagada' | 'pendiente' | 'vencida'

  @ManyToOne(() => OrdenCompra, { eager: true })
  @JoinColumn({ name: 'id_orden' })
  orden: OrdenCompra;
}
