import { Module } from '@nestjs/common';
import { TypeORMUsers } from '../providers/persistence/repositories/users';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [TypeORMUsers, UserService],
  exports: [TypeORMUsers, UserService],
  controllers: [UserController],
})
export class UsersModule {}
