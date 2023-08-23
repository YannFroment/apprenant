import { Inject, Injectable } from '@nestjs/common';
import { EncryptionProvider, Users } from '../user/user.service';
import { User } from '../user/user';

@Injectable()
export class AuthService {
  constructor(
    @Inject(Users)
    private users: Users,
    @Inject(EncryptionProvider)
    private encryptionProvider: EncryptionProvider,
  ) {}

  async validateUser(
    email: string,
    plainPassword: string,
  ): Promise<User | null> {
    const user = await this.users.findByEmail(email);

    if (
      user &&
      user.password === (await this.encryptionProvider.hash(plainPassword))
    ) {
      return user;
    }

    return null;
  }
}
