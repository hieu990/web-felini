import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { ReservationEntity } from './reservation.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationsRepository: Repository<ReservationEntity>,
  ) {}

  async create(reservationData: Partial<ReservationEntity>): Promise<ReservationEntity> {
    const reservation = this.reservationsRepository.create(reservationData);
    return this.reservationsRepository.save(reservation);
  }

  async findAll(status?: string, date?: string): Promise<ReservationEntity[]> {
    const whereClause: any = {};

    if (status && status.trim() !== '') {
      whereClause.status = status;
    }

    if (date && date.trim() !== '') {
      // Filter reservations for a single day
      const searchDate = new Date(date);
      const startOfDay = new Date(searchDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(searchDate.setHours(23, 59, 59, 999));
      whereClause.reservationTime = Between(startOfDay, endOfDay);
    }

    return this.reservationsRepository.find({
      where: whereClause,
      order: { reservationTime: 'ASC' },
    });
  }

  async findOne(id: string): Promise<ReservationEntity> {
    const reservation = await this.reservationsRepository.findOne({ where: { id } });
    if (!reservation) {
      throw new NotFoundException(`Không tìm thấy đặt bàn với ID: ${id}`);
    }
    return reservation;
  }

  async update(id: string, updateData: Partial<ReservationEntity>): Promise<ReservationEntity> {
    const reservation = await this.findOne(id);
    Object.assign(reservation, updateData);
    return this.reservationsRepository.save(reservation);
  }

  async remove(id: string): Promise<void> {
    const reservation = await this.findOne(id);
    await this.reservationsRepository.remove(reservation);
  }
}
