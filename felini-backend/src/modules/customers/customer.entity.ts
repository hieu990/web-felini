import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export interface ICustomerPreferences {
  allergies: string[]; // Dị ứng (hải sản, đậu phộng, gluten...)
  favoriteWine?: string[]; // Gu rượu vang
  seatingPreference?: string; // Vị trí ngồi (gần cửa sổ, phòng riêng...)
  dietaryNotes?: string; // Chế độ ăn kiêng (Thuần chay, Keto...)
  specialNotes?: string; // Ghi chú đặc biệt từ lần phục vụ trước
}

@Entity('customers')
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  fullName!: string;

  // Khai báo rõ type: 'varchar' để PostgreSQL hiểu đúng đây là chuỗi văn bản
  @Column({ type: 'varchar', unique: true, nullable: true })
  phoneNumber!: string | null;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', default: 'STANDARD' }) // VIP, VVIP, CELEB, STANDARD
  vipTag!: string;

  @Column({ type: 'jsonb', default: {} })
  preferences!: ICustomerPreferences;

  @Column({ type: 'integer', default: 0 })
  visitCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
