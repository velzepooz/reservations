import { Injectable } from '@nestjs/common';
import { Amenity } from './amenity.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AmenityRepository extends Repository<Amenity> {
  constructor(
    @InjectRepository(Amenity)
    private readonly _repository: Repository<Amenity>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
