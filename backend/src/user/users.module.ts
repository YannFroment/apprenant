import { Module } from '@nestjs/common';
import { TypeORMUsers } from '../providers/persistence/repositories/users';
import { UsersService } from './user.service';
import { BcryptEncryptionProvider } from '../providers/encryption/BcryptEncriptionProvider';

@Module({
  providers: [TypeORMUsers, UsersService, BcryptEncryptionProvider],
  exports: [TypeORMUsers, UsersService, BcryptEncryptionProvider],
})
export class UsersModule {}
