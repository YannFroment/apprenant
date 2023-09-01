import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { DatabaseModule } from './providers/persistence/database.module';
import { TypeORMTextReorders } from './providers/persistence/repositories/textReorders';
import { TypeORMWordRecognitions } from './providers/persistence/repositories/wordRecognitions';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { EncryptionModule } from './providers/encryption/encryption.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, EncryptionModule],
  controllers: [AppController],
  providers: [
    HealthCheck,
    TextReorderService,
    TypeORMTextReorders,
    TypeORMWordRecognitions,
    WordRecognitionService,
  ],
})
export class AppModule {}
