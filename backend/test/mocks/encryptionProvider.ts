import { EncryptionProvider } from '../../src/user/user.service';

export class MockEncryptionProvider implements EncryptionProvider {
  async hash(password: string): Promise<string> {
    return `hashed_${password}`;
  }
}
