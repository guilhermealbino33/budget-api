import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class ShowProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  /*
   *
   * TODO avaliar se será necessario esse tipo de useCase
   *
   * Se passar ID pega um, se não passar, pega todos?
   *
   * */

  async execute(productId: string) {
    const product = await this.productsRepository.findById(productId);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    return product;
  }
}
