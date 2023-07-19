import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
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

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([
        { id: 1, firstName: 'Laurent', lastName: 'Verdier', isActive: true },
      ]);
  });
});
