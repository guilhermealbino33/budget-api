import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { ICategory, Category } from '../../../../entities/category';

import { ICategoriesRepository } from '../ICategoriesRepository';

export default class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }
  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async create(category: ICategory): Promise<void> {
    const categoryToCreate = this.repository.create(category);
    this.repository.save(categoryToCreate);
  }

  async updateCategory(id: string, data: ICategory): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  async deleteCategory(categoryID: string): Promise<void> {
    this.repository.delete(categoryID);
  }

  async findById(category_id: string): Promise<Category> {
    return this.repository.findOne({
      where: [
        {
          id: category_id,
        },
      ],
    });
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({
      where: [
        {
          name,
        },
      ],
    });
  }
}
