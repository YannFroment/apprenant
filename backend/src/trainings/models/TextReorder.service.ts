import { Inject, Injectable } from '@nestjs/common';
import { TextReorder } from './TextReorder';
import { TextReorders } from './TextReorders';

@Injectable()
export class TextReorderService {
  constructor(
    @Inject(TextReorders) private readonly textReorders: TextReorders,
  ) {}

  async getAll(): Promise<TextReorder[]> {
    return this.textReorders.getAll();
  }
}
