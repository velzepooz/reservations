import { TestingModule } from '@nestjs/testing';
import { IReservation } from '../../src/modules/reservation/types/reservation-repository.types';
import { ReservationRepository } from '../../src/modules/reservation/reservation.repository';
import { Faker } from '../utils/faker.util';
import { DateTimeUtil } from '../../src/utils/date-time.util';
import { UserFactory } from './user.factory';
import { AmenityFactory } from './amenity.factory';

type createReservationType = {
  amenityId?: number;
  userId?: number;
  startTime?: number;
  endTime?: number;
  date?: number;
};

export class ReservationFactory {
  constructor(private _module: TestingModule) {}

  async create({
    userId,
    amenityId,
    startTime = Faker.integer({ min: 0, max: 100 }),
    endTime = Faker.integer({ min: 100, max: 500 }),
    date = DateTimeUtil.getStartDayTimestamp(),
  }: createReservationType): Promise<IReservation> {
    const reservationRepository = this._module.get<ReservationRepository>(
      ReservationRepository,
    );
    if (!userId) {
      const userFactory = new UserFactory(this._module);
      const user = await userFactory.create({});
      userId = user.id;
    }

    if (!amenityId) {
      const amenityFactory = new AmenityFactory(this._module);
      const amenity = await amenityFactory.create({});
      amenityId = amenity.id;
    }

    return reservationRepository.save({
      amenityId,
      userId,
      startTime,
      endTime,
      date,
    });
  }
}
