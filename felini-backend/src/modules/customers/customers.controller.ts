import { Controller, Get, Post, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerEntity, ICustomerPreferences } from './customer.entity';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async findAll(@Query('search') search?: string, @Query('vipTag') vipTag?: string) {
    return this.customersService.findAll(search, vipTag);
  }

  @Get('check-in')
  async quickCheckIn(@Query('search') search: string) {
    return this.customersService.quickCheckIn(search);
  }

  @Post()
  async create(@Body() customerData: Partial<CustomerEntity>) {
    return this.customersService.create(customerData);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() customerData: Partial<CustomerEntity>) {
    return this.customersService.update(id, customerData);
  }

  @Post(':id/preferences')
  async updatePreferences(
    @Param('id') id: string,
    @Body() preferences: Partial<ICustomerPreferences>,
  ): Promise<CustomerEntity> {
    return this.customersService.updatePreferences(id, preferences);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.customersService.remove(id);
  }
}

