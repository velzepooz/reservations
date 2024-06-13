import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  providers: [ReservationService, ReservationRepository],
  controllers: [ReservationController],
})
export class ReservationModule {}
