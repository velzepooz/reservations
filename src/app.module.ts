import { Module } from '@nestjs/common';
import ServerConfig from './config/server.config';
import { DataBaseConfig } from './config/database.config';
import JwtConfig from './config/auth-token.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './modules/reservation/reservation.module';
import { AmenityModule } from './modules/amenity/amenity.module';
import { UserModule } from './modules/user/user.module';
import { CsvParserModule } from './modules/csv-parser/csv-parser.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ServerConfig, JwtConfig],
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: ConfigService) => ({
        ...configService.get('auth-token'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(DataBaseConfig),
    ReservationModule,
    AmenityModule,
    UserModule,
    CsvParserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
