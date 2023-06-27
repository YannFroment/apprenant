import { Test, TestingModule } from '@nestjs/testing';
import { HealthCheck } from './app.service';

describe('AppService', () => {
  let healthCheck: HealthCheck;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthCheck],
    }).compile();

    healthCheck = module.get<HealthCheck>(HealthCheck);
  });

  it('should return status', () => {
    expect(healthCheck.getStatus()).toBe('Backend is running.');
  });
});
