import { DataSource } from 'typeorm';
import { runSeeder, Seeder, SeederFactoryManager } from 'typeorm-extension';
import UserAdminSeeder from './userAdmin';

export default class MainSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, UserAdminSeeder);
    // await runSeeder(dataSource, CitiesSeeder);
    // await runSeeder(dataSource, StatesSeeder);
  }
}
