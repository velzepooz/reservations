import { Module } from '@nestjs/common';
import ServerConfig from './config/server.config';
import { DataBaseConfig } from './config/database.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AmenityModule } from './modules/amenity/amenity.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig],
    }),
    TypeOrmModule.forRoot(DataBaseConfig),
    ReservationModule,
    AmenityModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
