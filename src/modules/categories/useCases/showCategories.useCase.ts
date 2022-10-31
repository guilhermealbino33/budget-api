import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
export default class ShowCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(
    page: number,
    limit: number,
    categoryId?: string,
    name?: string
  ) {
    if (categoryId) {
      if (!isValidId(categoryId)) {
        throw new AppError('Invalid id!', 400);
      }

      const category = await this.categoriesRepository.findById(categoryId);

      if (!category) {
        throw new AppError('Category not found!', 404);
      }

      return category;
    }

    if (name) {
      const categories = await this.categoriesRepository.findByQuery(
        page,
        limit,
        name
      );

      return categories;
    }

    const categories = await this.categoriesRepository.list(page, limit);

    if (!categories.content.length) {
      logging.debug('No categories found!');
    }

    return categories;
  }
}
