import { Test, TestingModule } from '@nestjs/testing';
import {
  WordRecognition,
  WordRecognitionService,
  WordRecognitions,
} from './WordRecognition.service';

class InMemoryWordRecognitions implements WordRecognitions {
  async getAll(): Promise<WordRecognition[]> {
    return [
      {
        id: 1,
        title: 'Les animaux',
        words: [
          { word: 'chat', url: 'chat.jpg' },
          { word: 'chien', url: 'chien.jpg' },
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
            { word: 'chat', url: 'chat.jpg' },
            { word: 'chien', url: 'chien.jpg' },
          ],
        },
      ]),
    );
  });
});
