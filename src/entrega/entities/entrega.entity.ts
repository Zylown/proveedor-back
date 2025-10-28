import { OrdenCompra } from 'src/orden/entities/orden-compra.entity';
import { Proveedor } from 'src/proveedor/entities/proveedor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('entrega')
export class Entrega {
  @PrimaryGeneratedColumn()
  id_entrega: number;

  @Column({ type: 'varchar', length: 30, nullable: true })
  numero_guia?: string | null;

  @Column({ type: 'date', nullable: true })
  fecha_entrega?: Date | null;

  @Column({ type: 'integer', nullable: true })
  cantidad_recibida?: number | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observaciones?: string | null;

  @Column({ type: 'varchar', length: 20, nullable: true })
  estado?: string | null; // 'pendiente' | 'completada' | 'cancelada'

  @ManyToOne(() => OrdenCompra, { eager: true })
  @JoinColumn({ name: 'id_orden' })
  orden: OrdenCompra;

  // proveedor via orden (join anidado)
  // si prefieres, puedes no mapear aquí y hacer join en el repositorio
}
