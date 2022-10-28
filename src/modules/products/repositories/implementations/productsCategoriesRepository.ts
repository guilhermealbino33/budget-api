import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { Category } from '../../../../entities/category';

import { IProductsCategoriesRepository } from '../IProductsCategoriesRepository';

export default class ProductsCategoriesRepository
  implements IProductsCategoriesRepository
{
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
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
}
