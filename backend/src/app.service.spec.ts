import { AppService } from './app.service';

describe('AppService', () => {
  it('should return Hello World!', () => {
    const appService = new AppService();

    expect(appService.getHello()).toBe('Hello World!');
  });
});
