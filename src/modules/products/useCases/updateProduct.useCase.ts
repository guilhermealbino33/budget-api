/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../../../entities/product';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICategoriesRepository } from '../../categories/repositories/ICategoriesRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(
    id: string,
    {
      name,
      code,
      installation_area,
      list_price,
      category_id,
      description,
    }: IProduct
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid product id!', 400);
    }

    let data = {};

    const productToUpdate = await this.productsRepository.findById(id);

    if (!productToUpdate) {
      throw new AppError('Product not found!', 404);
    }

    if (name) {
      data = { ...data, name };
    }

    if (code) {
      throw new AppError('Product code can not be changed!', 400);
    }

    if (list_price) {
      data = { ...data, list_price };
    }

    if (description) {
      data = { ...data, description };
    }

    if (installation_area) {
      data = { ...data, installation_area };
    }

    if (category_id) {
      const category = await this.categoriesRepository.findById(category_id);

      if (!category) {
        throw new AppError('Category not found!', 404);
      }

      data = { ...data, category_id };
    }

    return this.productsRepository.update(id, data);
  }
}
