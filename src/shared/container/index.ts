import { container } from 'tsyringe';

import '../providers';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/repositories/implementations/usersRepository';
import { IUsersTokensRepository } from '../../modules/users/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '../../modules/users/repositories/implementations/usersTokensRepository';

// Users
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);
