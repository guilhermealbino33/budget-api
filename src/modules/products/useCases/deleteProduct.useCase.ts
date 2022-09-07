import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(productId: string) {
    if (!isValidId(productId)) {
      throw new AppError('Invalid product id!', 400);
    }

    const productToDelete = await this.productsRepository.findById(productId);

    if (!productToDelete) {
      throw new AppError('Product not found!', 404);
    }

    await this.productsRepository.deleteProduct(productId);
  }
}
