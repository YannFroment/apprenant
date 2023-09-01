import { EncryptionProvider } from '../../src/providers/encryption/encryption.module';

export class MockEncryptionProvider implements EncryptionProvider {
  async hash(password: string): Promise<string> {
    return `hashed_${password}`;
  }

  async compare(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return `hashed_${plainPassword}` === hashedPassword;
  }
}
