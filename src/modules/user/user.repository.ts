import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser, IUserWithPassword } from './types/user-repository.types';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private _repository: Repository<User>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }

  async findOneByData(data: Partial<User>): Promise<IUser> {
    return this._repository.findOne({
      where: data,
    });
  }

  async findOneByWithPassword(data: Partial<User>): Promise<IUserWithPassword> {
    return this._repository.findOne({
      where: data,
      select: ['id', 'username', 'password'],
    });
  }
}
