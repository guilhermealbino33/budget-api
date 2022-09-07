import { inject, injectable } from 'tsyringe';
import { IProduct } from '../../../entities/product';
import { AppError } from '../../../shared/errors/AppError';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(product: IProduct) {
    const productAlreadyExists = await this.productsRepository.findBySku(
      product.sku
    );

    if (productAlreadyExists) {
      throw new AppError('Product already exists!', 409);
    }

    await this.productsRepository.create(product);
  }
}
