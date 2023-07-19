import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { TextReorders } from './trainings/models/TextReorders';
import { ConcreteTextReorders } from './trainings/external-sources/TextReorders';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognitions } from './trainings/models/WordRecognitions';
import { ConcreteWordRecognitions } from './trainings/external-sources/WordRecognitions';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersService } from './db-sandbox/user.service';
import { UserSchema } from './db-sandbox/UserSchema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'apprenant',
      password: 'apprenant',
      database: 'apprenant',
      entities: [],
      autoLoadEntities: true,
      synchronize: true, // TODO TO BE REMOVED FOR PRODUCTION
    }),
    TypeOrmModule.forFeature([UserSchema]),
  ],
  controllers: [AppController],
  providers: [
    HealthCheck,
    TextReorderService,
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
export class AppModule {
  constructor(private dataSource: DataSource) {} // todo make it readonly?
}
