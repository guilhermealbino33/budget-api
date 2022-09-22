/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface UpdateProductRequest {
  name?: string;
  code?: string;
  category_id?: string;
  size?: string;
  description?: string;
}

@injectable()
export default class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(
    id: string,
    { name, code, category_id, description, size }: UpdateProductRequest
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
      data = { ...data, code };
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
