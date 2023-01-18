import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../../entities/user';
import { AppError } from '../errors/AppError';

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
      role: 'admin',
      is_admin: true,
      is_salesman: false,
      email: 'admin@email.com',
    };

    const userAlreadyExists = await repository.findOneBy({ email: user.email });

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const newUser = repository.create(user);
    await repository.save(newUser);
  }
}
