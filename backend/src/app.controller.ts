import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from './app.service';
import { TextReorder } from './trainings/models/TextReorder';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognition } from './trainings/models/WordRecognition';

@Controller()
export class AppController {
  constructor(
    private readonly healthCheck: HealthCheck,
    private readonly textReorderService: TextReorderService,
    private readonly wordRecognitionService: WordRecognitionService,
  ) {}

  @Get('healthcheck')
  getAppStatus(): string {
    return this.healthCheck.getStatus();
  }

  @Get('text-reorders')
  async getTextReorders(): Promise<TextReorder[]> {
    return this.textReorderService.getAll();
  }

  @Get('word-recognition')
  async getWordRecognition(): Promise<WordRecognition[]> {
    return this.wordRecognitionService.getAll();
  }
}
