import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HealthCheck } from './app.service';
import { TextReorderService } from './trainings/models/TextReorder.service';
import { WordRecognitionService } from './trainings/models/WordRecognition.service';
import { UsersService } from './user/user.service';
import { TypeORMUsers } from './providers/persistence/repositories/users';
import { DatabaseModule } from './providers/persistence/database.module';
import { TypeORMTextReorders } from './providers/persistence/repositories/textReorders';
import { TypeORMWordRecognitions } from './providers/persistence/repositories/wordRecognitions';
import { BcryptEncryptionProvider } from './providers/encryption/BcryptEncriptionProvider';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { RefreshTokenStrategy } from './auth/jwtRefresh.strategy';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AppController],
  providers: [
    BcryptEncryptionProvider,
    HealthCheck,
    TextReorderService,
    TypeORMUsers,
    TypeORMTextReorders,
    TypeORMWordRecognitions,
    UsersService,
    WordRecognitionService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
  ],
})
export class AppModule {}
