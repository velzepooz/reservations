import { TestingModule } from '@nestjs/testing';
import { Faker } from '../utils/faker.util';
import { UserRepository } from '../../src/modules/user/user.repository';
import { IUser } from '../../src/modules/user/types/user-repository.types';

type createUserType = {
  email?: string;
};

export class UserFactory {
  constructor(private _module: TestingModule) {}

  async create({ email = Faker.email() }: createUserType): Promise<IUser> {
    const userRepository = this._module.get<UserRepository>(UserRepository);

    return userRepository.save({
      email,
    });
  }
}