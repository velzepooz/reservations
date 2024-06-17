import { testAppModuleClass } from '../utils/test-app.util';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { ReservationFactory } from '../factories/reservation.factory';
import { IReservation } from '../../src/modules/reservation/types/reservation-repository.types';
import { RESERVATION_HTTP_ROUTES } from '../../src/modules/reservation/constants/reservation-http-routes.constant';
import { UserFactory } from '../factories/user.factory';
import { AmenityFactory } from '../factories/amenity.factory';
import { IAmenity } from '../../src/modules/amenity/types/amenity-repository.types';
import { TestUtils } from '../utils/test.util';
import { DateTimeUtil } from '../../src/utils/date-time.util';
import { Faker } from '../utils/faker.util';
import { IUser } from '../../src/modules/user/types/user-repository.types';

describe('On /reservations', () => {
  let app: INestApplication,
    httpServer,
    testUtils: TestUtils,
    reservationFactory: ReservationFactory,
    userFactory: UserFactory,
    amenityFactory: AmenityFactory;

  beforeEach(async () => {
    app = await testAppModuleClass.getApp();
    const module = await testAppModuleClass.getAppModule();
    httpServer = app.getHttpServer();
    testUtils = app.get<TestUtils>(TestUtils);
    reservationFactory = new ReservationFactory(module);
    userFactory = new UserFactory(module);
    amenityFactory = new AmenityFactory(module);
  });

  afterEach(async () => {
    await testUtils.dropDatabase();
  });

  describe('GET /amenity/:amenityId/:reservationDate', () => {
    let currentAmenity: IAmenity,
      currentTimestamp: number,
      reservationsOfCurrentAmenityCount: number;

    beforeEach(async () => {
      const user = await userFactory.create({});
      currentAmenity = await amenityFactory.create({});
      currentTimestamp = DateTimeUtil.getStartDayTimestamp();
      reservationsOfCurrentAmenityCount = 2;
      const reservationPromises = [];
      for (let i = 0; i < reservationsOfCurrentAmenityCount; i++) {
        reservationPromises.push(
          reservationFactory.create({
            amenityId: currentAmenity.id,
            userId: user.id,
            date: currentTimestamp,
          }),
        );
      }
      await Promise.all(reservationPromises);
    });

    it('Should return 200 OK and the reservations of the current amenity', async () => {
      const response = await request(httpServer)
        .get(
          `${RESERVATION_HTTP_ROUTES.MAIN}${RESERVATION_HTTP_ROUTES.AMENITY}/${currentAmenity.id}/${currentTimestamp}`,
        )
        .expect(HttpStatus.OK);

      expect(response.body.length).toEqual(reservationsOfCurrentAmenityCount);
    });

    it('Should return reservations sorted in ascending order by startTime', async () => {
      const response = await request(httpServer)
        .get(
          `${RESERVATION_HTTP_ROUTES.MAIN}${RESERVATION_HTTP_ROUTES.AMENITY}/${currentAmenity.id}/${currentTimestamp}`,
        )
        .expect(HttpStatus.OK);

      const sortedByStartTime = response.body.every(
        (reservation: IReservation, index: number, array: IReservation[]) => {
          return (
            index === 0 || array[index - 1].startTime <= reservation.startTime
          );
        },
      );

      expect(sortedByStartTime).toBe(true);
    });

    it('Should return only reservations of the current amenity', async () => {
      await reservationFactory.create({});
      const response = await request(httpServer)
        .get(
          `${RESERVATION_HTTP_ROUTES.MAIN}${RESERVATION_HTTP_ROUTES.AMENITY}/${currentAmenity.id}/${currentTimestamp}`,
        )
        .expect(HttpStatus.OK);

      expect(response.body.length).toEqual(reservationsOfCurrentAmenityCount);
    });

    it('Should return 400 error if invalid amenityId is provided', async () => {
      await request(httpServer)
        .get(
          `${RESERVATION_HTTP_ROUTES.MAIN}${RESERVATION_HTTP_ROUTES.AMENITY}/${Faker.string()}/${currentTimestamp}`,
        )
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Should return 400 error if invalid reservationDate is provided', async () => {
      await request(httpServer)
        .get(
          `${RESERVATION_HTTP_ROUTES.MAIN}${RESERVATION_HTTP_ROUTES.AMENITY}/${currentAmenity.id}/${Faker.string()}`,
        )
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('GET /user/:userId', () => {
    let user: IUser,
      firstTimestamp: number,
      secondTimestamp: number,
      reservationsOfFirstDateCount: number,
      reservationsOfSecondDateCount: number;

    const getReservationCreationPromises = ({
      count,
      date,
      userId,
    }: {
      count: number;
      date: number;
      userId: number;
    }): Promise<IReservation>[] => {
      const promises: Promise<IReservation>[] = [];
      for (let i = 0; i < count; i++) {
        promises.push(
          reservationFactory.create({
            userId,
            date,
          }),
        );
      }

      return promises;
    };

    beforeEach(async () => {
      user = await userFactory.create({});
      firstTimestamp = DateTimeUtil.getStartDayTimestamp();
      secondTimestamp = DateTimeUtil.getStartDayTimestamp(
        DateTimeUtil.addDays(1),
      );
      reservationsOfFirstDateCount = Faker.integer({ min: 1, max: 5 });
      reservationsOfSecondDateCount = Faker.integer({ min: 1, max: 5 });
      await Promise.all([
        ...getReservationCreationPromises({
          count: reservationsOfFirstDateCount,
          date: firstTimestamp,
          userId: user.id,
        }),
        ...getReservationCreationPromises({
          count: reservationsOfSecondDateCount,
          date: secondTimestamp,
          userId: user.id,
        }),
      ]);
    });

    it('Should return 200 OK and the reservations of the current user', async () => {
      const response = await request(httpServer)
        .get(
          `${RESERVATION_HTTP_ROUTES.MAIN}${RESERVATION_HTTP_ROUTES.USER}/${user.id}`,
        )
        .expect(HttpStatus.OK);

      expect(response.body.length).toEqual(2);
      expect(response.body[0].date).toEqual(
        DateTimeUtil.toDayString(firstTimestamp),
      );
      expect(response.body[1].date).toEqual(
        DateTimeUtil.toDayString(secondTimestamp),
      );
      expect(response.body[0].reservations).toHaveLength(
        reservationsOfFirstDateCount,
      );
      expect(response.body[1].reservations).toHaveLength(
        reservationsOfSecondDateCount,
      );
    });

    it('Should return only reservations of the current user', async () => {
      await userFactory.create({});
      const response = await request(httpServer)
        .get(
          `${RESERVATION_HTTP_ROUTES.MAIN}${RESERVATION_HTTP_ROUTES.USER}/${user.id}`,
        )
        .expect(HttpStatus.OK);

      expect(response.body.length).toEqual(2);
    });

    it('Should return 400 error if invalid userId is provided', async () => {
      await request(httpServer)
        .get(
          `${RESERVATION_HTTP_ROUTES.MAIN}${RESERVATION_HTTP_ROUTES.USER}/${Faker.string()}`,
        )
        .expect(HttpStatus.BAD_REQUEST);
    });
  });
});
