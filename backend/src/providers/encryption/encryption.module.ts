import * as bcrypt from 'bcrypt';
import { EncryptionProvider } from '../../user/user.service';
import { Global, Module } from '@nestjs/common';

export class Bcrypt implements EncryptionProvider {
  private static saltOrRounds = 10;

  async hash(textToHash: string): Promise<string> {
    return bcrypt.hash(textToHash, Bcrypt.saltOrRounds);
  }

  async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
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
