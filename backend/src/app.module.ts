import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { TextReorders } from './trainings/models/TextReorders';
import { ConcreteTextReorders } from './trainings/external-sources/TextReorders';

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
  ],
})
export class AppModule {}
