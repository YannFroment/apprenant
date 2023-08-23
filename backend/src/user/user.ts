export class User {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  age: number;
  email: string;
  password: string;
}

export type CreateUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
