import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthCheck {
  getStatus(): string {
    return 'Backend is running.';
  }
}
