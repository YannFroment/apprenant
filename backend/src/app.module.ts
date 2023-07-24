import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { UsersService } from './user/user.service';
import { TypeORMUsers } from './persistence/repositories/users';
import { DatabaseModule } from './persistence/database.module';
import { TypeORMTextReorders } from './persistence/repositories/textReorders';
import { TypeORMWordRecognitions } from './persistence/repositories/wordRecognitions';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [
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
