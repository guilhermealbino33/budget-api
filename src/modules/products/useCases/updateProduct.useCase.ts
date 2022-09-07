/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface UpdateProductRequest {
  name?: string;
  category?: string;
  size?: string;
  description?: string;
  value?: number;
}

@injectable()
export default class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(
    id: string,
    { name, category, description, size, value }: UpdateProductRequest
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid product id!', 400);
    }

    const productToUpdate = await this.productsRepository.findById(id);

    if (!productToUpdate) {
      throw new AppError('Product not found!', 404);
    }

    productToUpdate.name = name ? name : productToUpdate.name;
    productToUpdate.category = category ? category : productToUpdate.category;
    productToUpdate.description = description;
    productToUpdate.value = value ? value : productToUpdate.value;
    productToUpdate.size = size ? size : productToUpdate.size;

    productToUpdate.updated_at = new Date();

    return this.productsRepository.updateProduct(productToUpdate);
  }
}
