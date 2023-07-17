import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { TextReorders } from './trainings/models/TextReorders';
import { ConcreteTextReorders } from './trainings/external-sources/TextReorders';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognitions } from './trainings/models/WordRecognitions';
import { ConcreteWordRecognitions } from './trainings/external-sources/WordRecognitions';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    HealthCheck,
    TextReorderService,
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
