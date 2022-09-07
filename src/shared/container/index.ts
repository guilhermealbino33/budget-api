import { container } from 'tsyringe';

import '../providers';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/repositories/implementations/usersRepository';
import { IUsersTokensRepository } from '../../modules/users/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '../../modules/users/repositories/implementations/usersTokensRepository';
import ProductsRepository from '../../modules/products/repositories/implementations/productsRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';

// Users
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);
container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UsersTokensRepository
);

// Products
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);
