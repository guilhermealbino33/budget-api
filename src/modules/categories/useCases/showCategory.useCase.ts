import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
export default class ShowCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(categoryId: string) {
    const category = await this.categoriesRepository.findById(categoryId);

    if (!category) {
      throw new AppError('Category not found!', 404);
    }

    return category;
  }
}
