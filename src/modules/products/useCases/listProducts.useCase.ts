import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class ListProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute() {
    const product = await this.productsRepository.list();

    if (!product || !product.length) {
      throw new AppError('No products found!', 404);
    }

    return product;
  }
}
