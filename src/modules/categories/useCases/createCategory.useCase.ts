import { inject, injectable } from 'tsyringe';
import { ICategory } from '../../../entities/category';
import { AppError } from '../../../shared/errors/AppError';
import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

@injectable()
export default class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(category: ICategory) {
    if (!category.name) {
      throw new AppError('Category name must be informed!', 400);
    }

    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      category.name
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!', 409);
    }

    await this.categoriesRepository.create(category);
  }
}
