import { Body, Controller, Get, Post } from '@nestjs/common';
import { HealthCheck } from './app.service';
import { TextReorder } from './trainings/models/TextReorder';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { WordRecognition } from './trainings/models/WordRecognition';
import { CreateUserDto, User } from './user/user';
import { UsersService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly healthCheck: HealthCheck,
    private readonly textReorderService: TextReorderService,
    private readonly wordRecognitionService: WordRecognitionService,
    private readonly usersService: UsersService,
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
  async getUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
