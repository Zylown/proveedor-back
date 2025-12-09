import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('estado')
export class Estado {
  @PrimaryGeneratedColumn()
  id_estado: number;

  @Column()
  nombre: string;

  @Column({ nullable: true })
  descripcion?: string;

  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_actualizacion: Date;
}
