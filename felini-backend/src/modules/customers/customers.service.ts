import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { ICustomerPreferences } from './customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customersRepository: Repository<CustomerEntity>,
  ) {}

  async findAll(search?: string, vipTag?: string): Promise<CustomerEntity[]> {
    const queryBuilder = this.customersRepository.createQueryBuilder('customer');

    if (search && search.trim() !== '') {
      queryBuilder.andWhere(
        '(customer.fullName ILIKE :search OR customer.phoneNumber ILIKE :search OR customer.email ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (vipTag && vipTag.trim() !== '') {
      queryBuilder.andWhere('customer.vipTag = :vipTag', { vipTag });
    }

    queryBuilder.orderBy('customer.updatedAt', 'DESC');

    return queryBuilder.getMany();
  }

  async quickCheckIn(search: string): Promise<CustomerEntity> {
    if (!search) {
      throw new Error('Search query is required');
    }

    const customer = await this.customersRepository.findOne({
      where: [
        { phoneNumber: search },
        { email: search },
      ],
    });

    if (!customer) {
      throw new NotFoundException(`Thực khách không tồn tại với thông tin: ${search}`);
    }

    customer.visitCount += 1;
    return this.customersRepository.save(customer);
  }

  async create(customerData: Partial<CustomerEntity>): Promise<CustomerEntity> {
    const customer = this.customersRepository.create(customerData);
    return this.customersRepository.save(customer);
  }

  async update(id: string, customerData: Partial<CustomerEntity>): Promise<CustomerEntity> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Thực khách không tồn tại với id: ${id}`);
    }
    
    Object.assign(customer, customerData);
    return this.customersRepository.save(customer);
  }

  async updatePreferences(
    id: string,
    preferences: Partial<ICustomerPreferences>,
  ): Promise<CustomerEntity> {
    const customer = await this.customersRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException(`Thực khách không tồn tại với id: ${id}`);
    }

    customer.preferences = {
      ...customer.preferences,
      ...preferences,
    };

    return this.customersRepository.save(customer);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Thực khách không tồn tại với id: ${id}`);
    }
    await this.customersRepository.remove(customer);
  }
}
