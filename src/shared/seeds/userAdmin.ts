import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../../entities/user';

export default class UserAdminSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    const password = await hash('admin', 8);

    const user = {
      name: 'admin',
      password,
      is_admin: true,
      email: 'admin@email.com',
    };

    const userAlreadyExists = repository.findOneBy({ email: user.email });

    if (!userAlreadyExists) {
      const newUser = repository.create(user);
      await repository.save(newUser);
    }
  }
}
