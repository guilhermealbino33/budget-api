import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
export default class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(categoryId: string) {
    if (!isValidId(categoryId)) {
      throw new AppError('Invalid category id!', 400);
    }

    const categoryToDelete = await this.categoriesRepository.findById(
      categoryId
    );

    if (!categoryToDelete) {
      throw new AppError('Category not found!', 404);
    }

    await this.categoriesRepository.deleteCategory(categoryId);
  }
}
