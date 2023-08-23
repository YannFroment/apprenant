import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { InMemoryTextReorders } from './trainings/models/TextReorder.service.spec';
import { TextReorders } from './trainings/models/TextReorders';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognitions } from './trainings/models/WordRecognitions';
import { InMemoryWordRecognitions } from './trainings/models/WordRecognition.service.spec';
import { UsersService, Users, EncryptionProvider } from './user/user.service';
import {
  InMemoryUsers,
  MockEncryptionProvider,
} from './user/user.service.spec';

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
        WordRecognitionService,
        {
          provide: WordRecognitions,
          useClass: InMemoryWordRecognitions,
        },
        UsersService,
        { provide: Users, useClass: InMemoryUsers },
        { provide: EncryptionProvider, useClass: MockEncryptionProvider },
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
