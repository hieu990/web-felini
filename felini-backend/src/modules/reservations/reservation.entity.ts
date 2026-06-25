import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  customerName!: string;

  @Column({ type: 'varchar', length: 20 })
  customerPhone!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  customerEmail!: string | null;

  @Column({ type: 'timestamp' })
  reservationTime!: Date;

  @Column({ type: 'integer' })
  numberOfGuests!: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tableNumber!: string | null;

  @Column({ type: 'varchar', default: 'PENDING' }) // PENDING, CONFIRMED, SEATED, COMPLETED, CANCELLED
  status!: string;

  @Column({ type: 'text', nullable: true })
  specialRequests!: string | null;

  @Column({ type: 'text', nullable: true })
  notes!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
