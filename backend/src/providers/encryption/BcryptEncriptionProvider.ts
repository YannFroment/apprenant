import * as bcrypt from 'bcrypt';
import { EncryptionProvider } from '../../user/user.service';

export class Bcrypt implements EncryptionProvider {
  private static saltOrRounds = 10;

  async hash(textToHash: string): Promise<string> {
    return bcrypt.hash(textToHash, Bcrypt.saltOrRounds);
  }
}

export const BcryptEncryptionProvider = {
  provide: EncryptionProvider,
  useClass: Bcrypt,
};
