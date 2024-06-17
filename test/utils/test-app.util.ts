import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { addExceptionFilter } from '../../src/app/utils/exception-filter.util';
import { TestUtils } from './test.util';
import { addMultipart } from '../../src/app/utils/multipart.util';

class TestAppModuleClass {
  app: NestFastifyApplication;
  module: TestingModule;

  private async createAppModule(): Promise<void> {
    this.module = await Test.createTestingModule({
      imports: [AppModule],
      providers: [TestUtils],
    }).compile();
    this.app = this.module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    addExceptionFilter(this.app);
    await addMultipart(this.app);
    await this.app.init();
    await this.app.getHttpAdapter().getInstance().ready();
  }

  async getApp(): Promise<INestApplication> {
    if (this.app) return this.app;
    await this.createAppModule();

    return this.app;
  }

  async getAppModule(): Promise<TestingModule> {
    if (this.module) return this.module;
    await this.createAppModule();

    return this.module;
  }
}

export const testAppModuleClass = new TestAppModuleClass();
