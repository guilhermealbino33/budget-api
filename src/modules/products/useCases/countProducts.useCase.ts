import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class CountProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute() {
    return this.productsRepository.count();
  }
}
