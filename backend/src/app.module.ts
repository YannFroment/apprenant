import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { TextReorders } from './trainings/models/TextReorders';
import { ConcreteTextReorders } from './trainings/external-sources/TextReorders';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognitions } from './trainings/models/WordRecognitions';
import { ConcreteWordRecognitions } from './trainings/external-sources/WordRecognitions';
import { UsersService } from './db-sandbox/user.service';
import { DatabaseModule } from './db-sandbox/database.module';
import { TypeORMUserRepository } from './db-sandbox/user.typeorm.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    HealthCheck,
    TextReorderService,
    TypeORMUserRepository,
    UsersService,
    {
      provide: TextReorders,
      useClass: ConcreteTextReorders,
    },
    WordRecognitionService,
    {
      provide: WordRecognitions,
      useClass: ConcreteWordRecognitions,
    },
  ],
})
export class AppModule {}
