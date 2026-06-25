import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('menu_items')
export class MenuEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 150 })
  name: string; // Tên món ăn (VD: Bò Wagyu A5 dát vàng)

  @Column({ type: 'varchar' })
  category: string; // Phân loại (APPETIZER, MAIN, DESSERT, DRINK)

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number; // Giá tiền

  @Column({ type: 'boolean', default: true })
  isAvailable: boolean; // Tình trạng: Còn phục vụ hay đã hết nguyên liệu?

  @CreateDateColumn()
  createdAt: Date;
}
