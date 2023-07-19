export class User {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export type CreateUserDto = {
  firstName: string;
  lastName: string;
};
