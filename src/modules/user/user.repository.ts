import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private _repository: Repository<User>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
