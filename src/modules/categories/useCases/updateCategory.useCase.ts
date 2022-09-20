/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { ICategory } from '../../../entities/category';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
export default class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string, { name, description }: ICategory) {
    let data = {};

    if (!isValidId(id)) {
      throw new AppError('Invalid category id!', 400);
    }

    const categoryToUpdate = await this.categoriesRepository.findById(id);

    if (!categoryToUpdate) {
      throw new AppError('Category not found!', 404);
    }

    if (name) {
      data = {
        name,
      };
    }

    if (description) {
      data = { ...data, description };
    }

    return this.categoriesRepository.updateCategory(id, data);
  }
}
