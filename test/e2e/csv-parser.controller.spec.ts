import { HttpStatus, INestApplication } from '@nestjs/common';
import { testAppModuleClass } from '../utils/test-app.util';
import request from 'supertest';
import process from 'process';
import { Faker } from '../utils/faker.util';

describe('On /csv-parser', () => {
  let app: INestApplication, httpServer;

  beforeEach(async () => {
    app = await testAppModuleClass.getApp();
    httpServer = app.getHttpServer();
  });

  describe('POST /csv-parser/json', () => {
    it('Should return 201 CREATED and the parsed csv file content', async () => {
      const amenityFile = `${process.cwd()}/test/utils/files/amenity.csv`;
      console.log(amenityFile);
      const response = await request(httpServer)
        .post('/csv-parser/json')
        .attach('file', amenityFile)
        .set('Content-Type', 'multipart/form-data')
        .expect(201);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].Id).toEqual('1');
      expect(response.body[1].Id).toEqual('2');
      expect(response.body[0].Name).toEqual('Massage room');
      expect(response.body[1].Name).toEqual('Gym');
    });

    it('Should return 400 BAD_REQUEST if invalid field name in body provided', async () => {
      const amenityFile = `${process.cwd()}/test/utils/files/amenity.csv`;

      const response = await request(httpServer)
        .post('/csv-parser/json')
        .attach(Faker.string(), amenityFile)
        .set('Content-Type', 'multipart/form-data')
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toEqual('Unexpected field');
    });

    it('Should return 400 BAD_REQUEST if invalid file provided', async () => {
      const amenityFile = `${process.cwd()}/test/utils/files/amenity.xlsx`;

      const response = await request(httpServer)
        .post('/csv-parser/json')
        .attach('file', amenityFile)
        .set('Content-Type', 'multipart/form-data')
        .expect(HttpStatus.BAD_REQUEST);

      expect(response.body.message).toEqual('Invalid file type');
    });
  });
});
