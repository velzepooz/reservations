import { Module } from '@nestjs/common';
import { Amenity } from './amenity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmenityRepository } from './amenity.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Amenity])],
  providers: [AmenityRepository],
})
export class AmenityModule {}
