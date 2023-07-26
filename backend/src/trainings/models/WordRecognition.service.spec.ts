import { Test, TestingModule } from '@nestjs/testing';
import { WordRecognitionService } from './WordRecognition.service';
import { Word, WordRecognition } from './WordRecognition';
import { WordRecognitions } from './WordRecognitions';

export class InMemoryWordRecognitions implements WordRecognitions {
  async getAll(): Promise<WordRecognition[]> {
    const wordRecognition: WordRecognition = {
      id: 1,
      title: 'Les animaux',
      words: [],
    };
    const chat: Word = {
      id: 1,
      label: 'chat',
      url: 'chat.jpg',
      wordRecognition,
    };
    const chien: Word = {
      id: 2,
      label: 'chien',
      url: 'chien.jpg',
      wordRecognition,
    };

    wordRecognition.words.push(chat, chien);

    return [wordRecognition];
  }
}

describe('WordRecognitionService', () => {
  let wordRecognitionService: WordRecognitionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WordRecognitionService,
        {
          provide: WordRecognitions,
          useClass: InMemoryWordRecognitions,
        },
      ],
    }).compile();

    wordRecognitionService = module.get<WordRecognitionService>(
      WordRecognitionService,
    );
  });

  it('should return word recognitions', async () => {
    expect(await wordRecognitionService.getAll()).toEqual([
      {
        id: 1,
        title: 'Les animaux',
        words: [
          expect.objectContaining({ id: 1, label: 'chat', url: 'chat.jpg' }),
          expect.objectContaining({ id: 2, label: 'chien', url: 'chien.jpg' }),
        ],
      },
    ]);
  });
});
