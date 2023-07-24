export class User {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
  age: number;
}

export type CreateUserDto = {
  firstName: string;
  lastName: string;
};
