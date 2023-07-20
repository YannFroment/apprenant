import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognitions } from './trainings/models/WordRecognitions';
import { ConcreteWordRecognitions } from './trainings/external-sources/WordRecognitions';
import { UsersService } from './user/user.service';
import { TypeORMUsers } from './persistence/repositories/users';
import { DatabaseModule } from './persistence/database.module';
import { TypeORMTextReorders } from './persistence/repositories/textReorders';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
    HealthCheck,
    TextReorderService,
    TypeORMUsers,
    TypeORMTextReorders,
    UsersService,
    WordRecognitionService,
    {
      provide: WordRecognitions,
      useClass: ConcreteWordRecognitions,
    },
  ],
})
export class AppModule {}
