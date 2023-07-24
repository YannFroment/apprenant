import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../src/persistence/database.providers';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    dataSource = module.get(DATA_SOURCE);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it('/healthcheck (GET)', () => {
    return request(app.getHttpServer())
      .get('/healthcheck')
      .expect(200)
      .expect('Backend is running.');
  });

  it('/text-reorders (GET)', () => {
    return request(app.getHttpServer()).get('/text-reorders').expect(200);
  });

  it('/word-recognition (GET)', () => {
    return request(app.getHttpServer()).get('/word-recognition').expect(200);
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.status).toBe(200);
  });
});
