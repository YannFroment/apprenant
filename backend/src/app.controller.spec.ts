import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { InMemoryTextReorders } from './trainings/models/TextReorder.service.spec';
import { TextReorders } from './trainings/models/TextReorders';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        HealthCheck,
        TextReorderService,
        {
          provide: TextReorders,
          useClass: InMemoryTextReorders,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return backend status', () => {
      expect(appController.getAppStatus()).toBe('Backend is running.');
    });
  });
});
