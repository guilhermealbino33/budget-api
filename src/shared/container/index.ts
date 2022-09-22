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
import AdditionalItemsRepository from '../../modules/additionalItems/repositories/implementations/AdditionalItemsRepository';
import { IAdditionalItemsRepository } from '../../modules/additionalItems/repositories/IAdditionalItemsRepository';
import { ICategoriesRepository } from '../../modules/categories/repositories/ICategoriesRepository';
import CategoriesRepository from '../../modules/categories/repositories/implementations/categoriesRepository';
import { ICitiesRepository } from '../../modules/address/repositories/ICitiesRepository';
import CitiesRepository from '../../modules/address/repositories/implementations/citiesRepository';
import StatesRepository from '../../modules/address/repositories/implementations/statesRepository';
import { IStatesRepository } from '../../modules/address/repositories/IStatesRepository';
import { IProductsImagesRepository } from '../../modules/products/repositories/IProductsImagesRepository';
import ProductsImagesRepository from '../../modules/products/repositories/implementations/productsImagesRepository';
import BudgetProductsRepository from '../../modules/budgets/repositories/implementations/budgetProductsRepository';
import { IBudgetProductsRepository } from '../../modules/budgets/repositories/IBudgetProductsRepository';
import { IBudgetAdditionalItemsRepository } from '../../modules/budgets/repositories/IBudgetAdditionalItemsRepository copy';
import BudgetAdditionalItemsRepository from '../../modules/budgets/repositories/implementations/budgetAdditionalItemsRepository';

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
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);
container.registerSingleton<IProductsImagesRepository>(
  'ProductsImagesRepository',
  ProductsImagesRepository
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
container.registerSingleton<IBudgetProductsRepository>(
  'BudgetProductsRepository',
  BudgetProductsRepository
);
container.registerSingleton<IBudgetAdditionalItemsRepository>(
  'BudgetAdditionalItemsRepository',
  BudgetAdditionalItemsRepository
);

// AdditionalItems
container.registerSingleton<IAdditionalItemsRepository>(
  'AdditionalItemsRepository',
  AdditionalItemsRepository
);

// Address
container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository
);
container.registerSingleton<IStatesRepository>(
  'StatesRepository',
  StatesRepository
);
