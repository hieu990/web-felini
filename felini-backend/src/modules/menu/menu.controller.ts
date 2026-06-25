import { Controller, Get, Post, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuItemEntity } from './menu-item.entity';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() itemData: Partial<MenuItemEntity>) {
    return this.menuService.create(itemData);
  }

  @Get()
  async findAll(@Query('category') category?: string) {
    return this.menuService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.menuService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<MenuItemEntity>,
  ) {
    return this.menuService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.menuService.remove(id);
  }
}
