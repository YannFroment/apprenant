import { Injectable } from '@nestjs/common';
import { TextReorder } from './TextReorder';

@Injectable()
export class TextReorderService {
  getAll(): TextReorder[] {
    return [
      {
        id: 1,
        title: 'Article sud-ouest',
        orderedSentences: ['a', 'b'],
        randomizedSentences: ['b', 'a'],
      },
    ];
  }
}
