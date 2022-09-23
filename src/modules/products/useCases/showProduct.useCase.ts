import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class ShowProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(productId?: string) {
    if (productId) {
      if (!isValidId(productId)) {
        throw new AppError('Invalid id!', 400);
      }

      const product = await this.productsRepository.findById(productId);

      if (!product) {
        throw new AppError('Product not found!', 404);
      }

      return product;
    }

    const products = await this.productsRepository.list();

    if (!products.length) {
      throw new AppError('No products found!', 404);
    }

    return products;
  }
}
