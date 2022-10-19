/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../../../entities/product';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(
    id: string,
    { name, code, list_price, category_id, description, size }: IProduct
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

    if (category_id) {
      data = { ...data, category_id };
    }

    if (size) {
      data = { ...data, size };
    }

    return this.productsRepository.update(id, data);
  }
}
