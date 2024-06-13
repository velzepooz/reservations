import { TestingModule } from '@nestjs/testing';
import { Faker } from '../utils/faker.util';
import { IAmenity } from '../../src/modules/amenity/types/amenity-repository.types';
import { AmenityRepository } from '../../src/modules/amenity/amenity.repository';

type createAmenityType = {
  name?: string;
};

export class AmenityFactory {
  constructor(private _module: TestingModule) {}

  async create({
    name = Faker.string(),
  }: createAmenityType): Promise<IAmenity> {
    const amenityRepository =
      this._module.get<AmenityRepository>(AmenityRepository);

    return amenityRepository.save({
      name,
    });
  }
}
