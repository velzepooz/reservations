import * as process from 'node:process';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Reservation } from '../modules/reservation/reservation.entity';
import { User } from '../modules/user/user.entity';
import { Amenity } from '../modules/amenity/amenity.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

export const DataBaseConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Reservation, User, Amenity],
  migrations: ['./dist/migrations/*.js'],
};

export default new DataSource({ ...DataBaseConfig });
