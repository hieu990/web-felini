import { Controller, Get, Post, Patch, Delete, Body, Query, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationEntity } from './reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  async create(@Body() reservationData: Partial<ReservationEntity>) {
    return this.reservationsService.create(reservationData);
  }

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('date') date?: string,
  ) {
    return this.reservationsService.findAll(status, date);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: Partial<ReservationEntity>,
  ) {
    return this.reservationsService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reservationsService.remove(id);
  }
}
