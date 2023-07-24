import { Test, TestingModule } from '@nestjs/testing';
import { WordRecognitionService } from './WordRecognition.service';
import { WordRecognition } from './WordRecognition';
import { WordRecognitions } from './WordRecognitions';

export class InMemoryWordRecognitions implements WordRecognitions {
  async getAll(): Promise<WordRecognition[]> {
    return [
      {
        id: 1,
        title: 'Les animaux',
        words: [
          { id: 1, word: 'chat', url: 'chat.jpg' },
          { id: 2, word: 'chien', url: 'chien.jpg' },
        ],
      },
    ];
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
    expect(await wordRecognitionService.getAll()).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          title: 'Les animaux',
          words: [
            { id: 1, word: 'chat', url: 'chat.jpg' },
            { id: 2, word: 'chien', url: 'chien.jpg' },
          ],
        },
      ]),
    );
  });
});
