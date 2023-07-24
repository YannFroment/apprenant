import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { WordRecognition } from '../../trainings/models/WordRecognition';

export default class WordRecognitionSeeder implements Seeder {
  public async run(
    _: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const factory = factoryManager.get(WordRecognition);
    await factory.save();
  }
}
