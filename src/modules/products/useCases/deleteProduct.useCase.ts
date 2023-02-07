import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { IStorageProvider } from '../../../shared/providers/StorageProvider/IStorageProvider';
import { isValidId } from '../../../shared/utils/idValidator';
import { IBudgetProductsRepository } from '../../budgets/repositories/IBudgetProductsRepository';
import { IBudgetsRepository } from '../../budgets/repositories/IBudgetsRepository';
import { IProductsImagesRepository } from '../repositories/IProductsImagesRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('BudgetProductsRepository')
    private budgetProductsRepository: IBudgetProductsRepository,
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    @inject('ProductsImagesRepository')
    private productsImagesRepository: IProductsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(productId: string) {
    if (!isValidId(productId)) {
      throw new AppError('Invalid product id!', 400);
    }

    const productToDelete = await this.productsRepository.findById(productId);

    if (!productToDelete) {
      throw new AppError('Product not found!', 404);
    }

    const productsInBudgets =
      await this.budgetProductsRepository.findByProductId(productToDelete.id);

    const budgetNumbers: string[] = [];

    if (productsInBudgets.length) {
      for (const budgetProduct of productsInBudgets) {
        const budget = await this.budgetsRepository.findById(
          budgetProduct.budget_id
        );

        budgetNumbers.push(budget.id);
      }

      throw new AppError(
        `Product is linked to one or more budgets! Budget(s) code(s): ${budgetNumbers}`,
        400
      );
    }

    if (productToDelete.images.length) {
      for (const image of productToDelete.images) {
        await this.productsImagesRepository.delete(image.id);
        await this.storageProvider.delete(image.file_name, 'products');
      }
    }

    await this.productsRepository.deleteProduct(productId);
  }
}
