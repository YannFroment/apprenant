import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { TextReorder } from '../../../trainings/models/TextReorder';

export default class TextReorderSeeder implements Seeder {
  public async run(
    _: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const factory = factoryManager.get(TextReorder);
    await factory.save();
  }
}
