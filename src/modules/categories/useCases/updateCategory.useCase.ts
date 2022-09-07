/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface UpdateCategoryRequest {
  name?: string;
  description?: string;
}

@injectable()
export default class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string, { name, description }: UpdateCategoryRequest) {
    if (!isValidId(id)) {
      throw new AppError('Invalid category id!', 400);
    }

    const categoryToUpdate = await this.categoriesRepository.findById(id);

    if (!categoryToUpdate) {
      throw new AppError('Category not found!', 404);
    }

    categoryToUpdate.name = name ? name : categoryToUpdate.name;
    categoryToUpdate.description = description;
    categoryToUpdate.updated_at = new Date();

    return this.categoriesRepository.updateCategory(categoryToUpdate);
  }
}
