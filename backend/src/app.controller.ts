import {
  Controller,
  Get,
  Post,
  Request as Req,
  UseGuards,
} from '@nestjs/common';
import { HealthCheck } from './app.service';
import { TextReorder } from './trainings/models/TextReorder';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognition } from './trainings/models/WordRecognition';
import { Request } from 'express';
import { LocalAuthGuard } from './auth/local.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { RefreshTokenGuard } from './auth/jwtRefresh.guard';
import { JwtUser } from './auth/jwt.strategy';
import { RefreshTokenUser } from './auth/jwtRefresh.strategy';
import { UserWithoutPassword } from './user/user.controller';

@Controller()
export class AppController {
  constructor(
    private readonly healthCheck: HealthCheck,
    private readonly textReorderService: TextReorderService,
    private readonly wordRecognitionService: WordRecognitionService,
    private readonly authService: AuthService,
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

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as UserWithoutPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: { user: JwtUser }) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('auth/refresh')
  async refreshAuthTokens(@Req() req: { user: RefreshTokenUser }) {
    return this.authService.refreshAuthTokens(
      req.user.userId,
      req.user.refreshToken,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('auth/logout')
  async logout(@Req() req: { user: JwtUser }) {
    return this.authService.logout(req.user.userId);
  }
}
