import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItemEntity } from './menu-item.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuItemEntity)
    private readonly menuItemsRepository: Repository<MenuItemEntity>,
  ) {}

  async create(itemData: Partial<MenuItemEntity>): Promise<MenuItemEntity> {
    const menuItem = this.menuItemsRepository.create(itemData);
    return this.menuItemsRepository.save(menuItem);
  }

  async findAll(category?: string): Promise<MenuItemEntity[]> {
    const whereClause: any = {};
    if (category && category.trim() !== '') {
      whereClause.category = category;
    }
    return this.menuItemsRepository.find({
      where: whereClause,
      order: { category: 'ASC', nameEn: 'ASC' },
    });
  }

  async findOne(id: string): Promise<MenuItemEntity> {
    const menuItem = await this.menuItemsRepository.findOne({ where: { id } });
    if (!menuItem) {
      throw new NotFoundException(`Không tìm thấy món ăn với ID: ${id}`);
    }
    return menuItem;
  }

  async update(id: string, updateData: Partial<MenuItemEntity>): Promise<MenuItemEntity> {
    const menuItem = await this.findOne(id);
    Object.assign(menuItem, updateData);
    return this.menuItemsRepository.save(menuItem);
  }

  async remove(id: string): Promise<void> {
    const menuItem = await this.findOne(id);
    await this.menuItemsRepository.remove(menuItem);
  }
}
