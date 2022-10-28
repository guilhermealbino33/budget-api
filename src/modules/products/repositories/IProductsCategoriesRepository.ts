import { Category } from '../../../entities/category';

export interface IProductsCategoriesRepository {
  findById(category_id: string): Promise<Category>;
}
