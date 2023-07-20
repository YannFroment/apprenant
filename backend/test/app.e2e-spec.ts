import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../src/persistence/database.providers';
import { runSeeders } from 'typeorm-extension';
import UserSeeder from '../src/persistence/seeds/user.seeder';
import userFactory from '../src/persistence/factories/user.factory';

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

    await dataSource.dropDatabase();
    await dataSource.runMigrations();
    await runSeeders(dataSource, {
      seeds: [UserSeeder],
      factories: [userFactory],
    });
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
    return request(app.getHttpServer())
      .get('/text-reorders')
      .expect(200)
      .expect([
        {
          id: 1,
          title: 'Véritable article sud-ouest',
          orderedSentences: ['phrase 1', 'phrase 2'],
          randomizedSentences: ['phrase 2', 'phrase 1'],
        },
      ]);
  });

  it('/word-recognition (GET)', () => {
    return request(app.getHttpServer())
      .get('/word-recognition')
      .expect(200)
      .expect([
        {
          id: 1,
          title: 'Les transports',
          words: [{ word: 'voiture', url: 'voiture.jpg' }],
        },
      ]);
  });

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      expect.objectContaining({
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        isActive: true,
        age: 42,
      }),
    ]);
  });
});
