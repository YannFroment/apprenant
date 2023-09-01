import { Module } from '@nestjs/common';
import { TypeORMUsers } from '../providers/persistence/repositories/users';
import { UserService } from './user.service';

@Module({
  providers: [TypeORMUsers, UserService],
  exports: [TypeORMUsers, UserService],
})
export class UsersModule {}
