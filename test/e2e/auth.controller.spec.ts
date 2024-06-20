import { HttpStatus, INestApplication } from '@nestjs/common';
import { TestUtils } from '../utils/test.util';
import { UserFactory } from '../factories/user.factory';
import { testAppModuleClass } from '../utils/test-app.util';
import request from 'supertest';
import { AUTH_ROUTES } from '../../src/modules/auth/constants/auth-routes.constant';
import { Faker } from '../utils/faker.util';
import { AUTH_ERRORS } from '../../src/modules/auth/constants/auth-errors.constant';

describe('On /auth', () => {
  let app: INestApplication,
    httpServer,
    testUtils: TestUtils,
    userFactory: UserFactory;

  beforeEach(async () => {
    app = await testAppModuleClass.getApp();
    const module = await testAppModuleClass.getAppModule();
    httpServer = app.getHttpServer();
    testUtils = app.get<TestUtils>(TestUtils);
    userFactory = new UserFactory(module);
  });

  afterEach(async () => {
    await testUtils.dropDatabase();
  });

  describe('POST /auth/signUp', () => {
    let userData;
    beforeEach(async () => {
      const user = await userFactory.create({ onlyData: true });
      userData = {
        username: user.username,
        password: user.password,
        confirmPassword: user.password,
      };
    });

    it('Should return 201 CREATED and the created user', async () => {
      const response = await request(httpServer)
        .post(`${AUTH_ROUTES.MAIN}${AUTH_ROUTES.SIGN_UP}`)
        .send(userData)
        .expect(HttpStatus.CREATED);

      expect(response.body.id).toBeDefined();
      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.body.username).toEqual(userData.username);
    });

    it('Should return 400 if username already exists', async () => {
      await userFactory.create(userData);
      const response = await request(httpServer)
        .post(`${AUTH_ROUTES.MAIN}${AUTH_ROUTES.SIGN_UP}`)
        .send(userData)
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message[0]).toEqual(
        AUTH_ERRORS.USERNAME_EXISTS.message,
      );
    });

    it('Should return BAD_REQUEST when incorrect username', async () => {
      await request(httpServer)
        .post(`${AUTH_ROUTES.MAIN}${AUTH_ROUTES.SIGN_UP}`)
        .send({
          username: 'test@test.com',
          password: Faker.password(),
          confirmPassword: Faker.password(),
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Should return BAD_REQUEST when password do not match requirements', async () => {
      await request(httpServer)
        .post(`${AUTH_ROUTES.MAIN}${AUTH_ROUTES.SIGN_UP}`)
        .send({
          username: Faker.username(),
          password: 'asdasd12312',
          confirmPassword: 'asdasd12312',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('Should return BAD_REQUEST when confirm password do not match password', async () => {
      const response = await request(httpServer)
        .post(`${AUTH_ROUTES.MAIN}${AUTH_ROUTES.SIGN_UP}`)
        .send({
          username: Faker.username(),
          password: Faker.password(),
          confirmPassword: Faker.password() + 'asdasd12312',
        })
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message[0]).toEqual(
        AUTH_ERRORS.PASSWORDS_DO_NOT_MATCH.message,
      );
    });
  });
});
