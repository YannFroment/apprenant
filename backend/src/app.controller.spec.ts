import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { InMemoryTextReorders } from './trainings/models/TextReorder.service.spec';
import { TextReorders } from './trainings/models/TextReorders';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognitions } from './trainings/models/WordRecognitions';
import { InMemoryWordRecognitions } from './trainings/models/WordRecognition.service.spec';
import { UsersService, Users } from './user/user.service';
import { InMemoryUsers } from '../test/mocks/users';
import { MockEncryptionProvider } from '../test/mocks/encryptionProvider';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { EncryptionProvider } from './providers/encryption/encryption.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        JwtModule.register({
          signOptions: { expiresIn: '60s' },
        }),
      ],
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
        AuthService,
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
