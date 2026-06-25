import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('menu_items')
export class MenuItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 150 })
  nameEn!: string;

  @Column({ length: 150 })
  nameVi!: string;

  @Column({ type: 'text', nullable: true })
  descriptionEn!: string | null;

  @Column({ type: 'text', nullable: true })
  descriptionVi!: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price!: number;

  @Column({ default: 'MAINS' }) // APPETIZERS, MAINS, DESSERTS, DRINKS, WINES
  category!: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  subCategory!: string | null; // Penne, Rigatoni, Spaghetti, Tagliatelle, Antipasti, Dolci, Soft Drinks, etc.

  @Column({ default: true })
  isAvailable!: boolean;

  @Column({ type: 'varchar', length: 500, nullable: true })
  imageUrl!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
