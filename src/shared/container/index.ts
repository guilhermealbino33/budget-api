import { container } from 'tsyringe';

import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import IUsersService from '../../modules/users/services/IUsersService';
import UsersService from '../../modules/users/services/implementations/users.service';
import UsersRepository from '../../modules/users/repositories/implementations/UsersRepository';

// Users
container.registerSingleton<IUsersService>('UsersService', UsersService);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
