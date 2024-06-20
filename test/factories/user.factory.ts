import { TestingModule } from '@nestjs/testing';
import { Faker } from '../utils/faker.util';
import { UserRepository } from '../../src/modules/user/user.repository';
import { IUserWithPassword } from '../../src/modules/user/types/user-repository.types';

type createUserType = {
  username?: string;
  password?: string;
  onlyData?: boolean;
};

export class UserFactory {
  constructor(private _module: TestingModule) {}

  async create({
    username = Faker.username(),
    password = Faker.password(),
    onlyData = false,
  }: createUserType): Promise<IUserWithPassword> {
    if (onlyData) {
      return {
        id: Faker.integer({}),
        username,
        password,
      };
    }
    const userRepository = this._module.get<UserRepository>(UserRepository);

    return userRepository.save({
      username,
      password,
    });
  }
}
