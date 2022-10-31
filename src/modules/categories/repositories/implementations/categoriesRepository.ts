import { ILike, Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { ICategory, Category } from '../../../../entities/category';
import Page from '../../../../shared/types/page';

import { ICategoriesRepository } from '../ICategoriesRepository';

export default class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
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

  async list(page: number, limit: number): Promise<Page<Category>> {
    const skip = (page - 1) * limit;
    const categories = await this.repository.find({
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: categories, page, totalPages, totalDocuments };
  }

  async findByQuery(
    page: number,
    limit: number,
    nameSearch: string
  ): Promise<Page<Category>> {
    const skip = (page - 1) * limit;
    const categories = await this.repository.find({
      where: { name: ILike(`%${nameSearch}%`) },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: categories, page, totalPages, totalDocuments };
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
