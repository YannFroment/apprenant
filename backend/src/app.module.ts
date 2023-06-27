import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [HealthCheck],
})
export class AppModule {}
