import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, User } from './user';

export type UserWithoutPassword = Omit<User, 'password'>;
export const userMapper = (user: User): UserWithoutPassword => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...rest } = user;

  return rest;
};

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getUsers(): Promise<UserWithoutPassword[]> {
    return (await this.usersService.findAll()).map(userMapper);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    const user = await this.usersService.create(createUserDto);

    return userMapper(user);
  }
}
