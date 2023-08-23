import { Users } from '../../src/user/user.service';
import { CreateUserDto, User } from '../../src/user/user';

export const testUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  isActive: true,
  age: 42,
  email: 'email@email.com',
  password: 'hashed_password',
};

export class InMemoryUsers implements Users {
  data: User[] = [testUser];

  async find(): Promise<User[]> {
    return this.data;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return createUserDto as User;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.data.find((user) => user.email === email) ?? null;
  }
}
