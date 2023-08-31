import {
  Body,
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
import { CreateUserDto, User } from './user/user';
import { UsersService } from './user/user.service';
import { Request } from 'express';
import { LocalAuthGuard } from './auth/local.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.guard';
import { RefreshTokenGuard } from './auth/jwtRefresh.guard';

export type UserWithoutPassword = Omit<User, 'password'>;
export const userMapper = (user: User): UserWithoutPassword => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;

  return rest;
};

@Controller()
export class AppController {
  constructor(
    private readonly healthCheck: HealthCheck,
    private readonly textReorderService: TextReorderService,
    private readonly wordRecognitionService: WordRecognitionService,
    private readonly usersService: UsersService,
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

  @Get('users')
  async getUsers(): Promise<UserWithoutPassword[]> {
    return (await this.usersService.findAll()).map(userMapper);
  }

  @Post('user')
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    const user = await this.usersService.create(createUserDto);

    return userMapper(user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as UserWithoutPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(RefreshTokenGuard)
  @Get('auth/refresh')
  async refreshAuthTokens(@Req() req: any) {
    return this.authService.refreshAuthTokens(
      req.user.id,
      req.user.refreshToken,
    );
  }
}
