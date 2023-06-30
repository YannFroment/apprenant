import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from './app.service';
import { TextReorder } from './trainings/models/TextReorder';
import { TextReorderService } from './trainings/models/TextReorder.service';

@Controller()
export class AppController {
  constructor(
    private readonly healthCheck: HealthCheck,
    private readonly textReorderService: TextReorderService,
  ) {}

  @Get('healthcheck')
  getAppStatus(): string {
    return this.healthCheck.getStatus();
  }

  @Get('text-reorders')
  async getTextReorders(): Promise<TextReorder[]> {
    return this.textReorderService.getAll();
  }
}
