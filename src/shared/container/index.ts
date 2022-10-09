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
import { ISalesmenRepository } from '../../modules/salesmen/repositories/ISalesmenRepository';
import SalesmenRepository from '../../modules/salesmen/repositories/implementations/salesmenRepository';
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
import { IBudgetAdditionalItemsRepository } from '../../modules/budgets/repositories/IBudgetAdditionalItemsRepository';
import BudgetAdditionalItemsRepository from '../../modules/budgets/repositories/implementations/budgetAdditionalItemsRepository';
import { UpdateBudgetAdditionalItemsService } from '../../modules/budgets/services/implementations/updateBudgetAdditionalItems.service';
import { IUpdateBudgetAdditionalItemsService } from '../../modules/budgets/services/IUpdateBudgetAdditionalItemsService';
import { IUpdateBudgetProductsService } from '../../modules/budgets/services/IUpdateBudgetProductsService';
import { UpdateBudgetProductsService } from '../../modules/budgets/services/implementations/updateBudgetProducts.service';

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
container.registerSingleton<ISalesmenRepository>(
  'SalesmenRepository',
  SalesmenRepository
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
container.registerSingleton<IUpdateBudgetAdditionalItemsService>(
  'UpdateBudgetAdditionalItemsService',
  UpdateBudgetAdditionalItemsService
);
container.registerSingleton<IUpdateBudgetProductsService>(
  'UpdateBudgetProductsService',
  UpdateBudgetProductsService
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
