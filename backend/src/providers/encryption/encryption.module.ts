import * as bcryptjs from 'bcryptjs';
import { Global, Module } from '@nestjs/common';

export const EncryptionProvider = 'EncryptionProvider';

export interface EncryptionProvider {
  hash: (textToHash: string) => Promise<string>;
  compare: (plainPassword: string, hashedPassword: string) => Promise<boolean>;
}

export class Bcrypt implements EncryptionProvider {
  private static saltOrRounds = 10;

  async hash(textToHash: string): Promise<string> {
    return bcryptjs.hash(textToHash, Bcrypt.saltOrRounds);
  }

  async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcryptjs.compare(plainPassword, hashedPassword);
  }
}

const BcryptEncryptionProvider = {
  provide: EncryptionProvider,
  useClass: Bcrypt,
};
@Global()
@Module({
  providers: [BcryptEncryptionProvider],
  exports: [BcryptEncryptionProvider],
})
export class EncryptionModule {}
