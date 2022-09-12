import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
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
      throw new AppError('Category not found!', 404);
    }

    return category;
  }
}
