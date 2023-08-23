import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { UsersService } from './user/user.service';
import { TypeORMUsers } from './providers/persistence/repositories/users';
import { DatabaseModule } from './providers/persistence/database.module';
import { TypeORMTextReorders } from './providers/persistence/repositories/textReorders';
import { TypeORMWordRecognitions } from './providers/persistence/repositories/wordRecognitions';
import { BcryptEncryptionProvider } from './providers/encryption/BcryptEncriptionProvider';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    BcryptEncryptionProvider,
    HealthCheck,
    TextReorderService,
    TypeORMUsers,
    TypeORMTextReorders,
    TypeORMWordRecognitions,
    UsersService,
    WordRecognitionService,
  ],
})
export class AppModule {}
