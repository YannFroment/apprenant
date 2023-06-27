import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly healthCheck: HealthCheck) {}

  @Get('healthcheck')
  getAppStatus(): string {
    return this.healthCheck.getStatus();
  }
}
