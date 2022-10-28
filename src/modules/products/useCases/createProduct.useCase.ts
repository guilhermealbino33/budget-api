import { inject, injectable } from 'tsyringe';
import { IProduct } from '../../../entities/product';
import { AppError } from '../../../shared/errors/AppError';
import { IProductsCategoriesRepository } from '../repositories/IProductsCategoriesRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ProductsCategoriesRepository')
    private categoriesRepository: IProductsCategoriesRepository
  ) {}

  async execute(product: IProduct) {
    const productAlreadyExists = await this.productsRepository.findByCode(
      product.code
    );

    if (productAlreadyExists) {
      throw new AppError('Product already exists!', 409);
    }

    if (!product.category_id) {
      throw new AppError('Product must belong to a category!', 400);
    }

    if (!product.code) {
      throw new AppError('Product must have a code!', 400);
    }

    if (!product.list_price) {
      throw new AppError('Product must have a list price!', 400);
    }

    if (!product.name) {
      throw new AppError('Product must have a name!', 400);
    }

    const category = await this.categoriesRepository.findById(
      product.category_id
    );

    if (!category) {
      throw new AppError('Category not found!', 404);
    }

    await this.productsRepository.create(product);
  }
}
