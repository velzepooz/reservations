import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm/data-source/DataSource';
import { IUser } from '../../src/modules/user/types/user-repository.types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TestUtils {
  /**
   * Creates an instance of TestUtils
   */
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('ERROR-TEST-UTILS-ONLY-FOR-TESTS');
    }
  }

  async getEntities() {
    const entities = [];

    (await (await this.dataSource).entityMetadatas).forEach((x) =>
      entities.push({ name: x.name, tableName: x.tableName }),
    );

    return entities;
  }

  async dropDatabase() {
    const entities = await this.getEntities();

    try {
      for (const entity of entities) {
        const repository = await this.dataSource.getRepository(entity.name);

        await repository.query(`DELETE FROM "${entity.tableName}";`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  async generateJwt(userData: IUser): Promise<string> {
    return this.jwtService.signAsync(userData);
  }
}
