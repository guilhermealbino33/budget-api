import { ICategory, Category } from '../../../entities/category';
import Page from '../../../shared/types/page';

export interface ICategoriesRepository {
  create(category: ICategory): Promise<void>;
  updateCategory(id: string, category: ICategory): Promise<void>;
  deleteCategory(categoryID: string): Promise<void>;
  findById(category_id: string): Promise<Category>;
  list(page: number, limit: number): Promise<Page<Category>>;
  findByQuery(
    page: number,
    limit: number,
    nameSearch: string
  ): Promise<Page<Category>>;
  findByName(name: string): Promise<Category>;
}
