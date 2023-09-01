import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { DatabaseModule } from './providers/persistence/database.module';
import { TypeORMTextReorders } from './providers/persistence/repositories/textReorders';
import { TypeORMWordRecognitions } from './providers/persistence/repositories/wordRecognitions';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { RefreshTokenStrategy } from './auth/jwtRefresh.strategy';
import { UsersModule } from './user/users.module';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      signOptions: { expiresIn: '15m' },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    HealthCheck,
    TextReorderService,
    TypeORMTextReorders,
    TypeORMWordRecognitions,
    WordRecognitionService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
})
export class AppModule {}
