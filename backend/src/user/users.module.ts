import { Module } from '@nestjs/common';
import { TypeORMUsers } from '../providers/persistence/repositories/users';
import { UsersService } from './user.service';

@Module({
  providers: [TypeORMUsers, UsersService],
  exports: [TypeORMUsers, UsersService],
})
export class UsersModule {}
