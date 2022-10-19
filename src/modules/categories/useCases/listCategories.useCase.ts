import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
export default class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute() {
    const category = await this.categoriesRepository.list();

    if (!category) {
      logging.debug('No categories found!');
    }

    return category;
  }
}
