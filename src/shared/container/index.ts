import { container } from 'tsyringe';

import '../providers';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import UsersRepository from '../../modules/users/repositories/implementations/usersRepository';
import { IUsersTokensRepository } from '../../modules/users/repositories/IUsersTokensRepository';
import { UsersTokensRepository } from '../../modules/users/repositories/implementations/usersTokensRepository';
import ProductsRepository from '../../modules/products/repositories/implementations/productsRepository';
import { IProductsRepository } from '../../modules/products/repositories/IProductsRepository';
import { ICustomersRepository } from '../../modules/customers/repositories/ICustomersRepository';
import CustomersRepository from '../../modules/customers/repositories/implementations/customerRepository';
import { ISalesmanRepository } from '../../modules/salesman/repositories/ISalesmanRepository';
import SalesmanRepository from '../../modules/salesman/repositories/implementations/salesmanRepository';
import { IBudgetsRepository } from '../../modules/budgets/repositories/IBudgetsRepository';
import BudgetsRepository from '../../modules/budgets/repositories/implementations/budgetsRepository';

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

// Customers
container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository
);

// Salesman
container.registerSingleton<ISalesmanRepository>(
  'SalesmanRepository',
  SalesmanRepository
);

// Budgets
container.registerSingleton<IBudgetsRepository>(
  'BudgetsRepository',
  BudgetsRepository
);
