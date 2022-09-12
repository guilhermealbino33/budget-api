import { ICategory, Category } from '../../../entities/category';

export interface ICategoriesRepository {
  create(category: ICategory): Promise<void>;
  updateCategory(category: ICategory): Promise<void>;
  deleteCategory(categoryID: string): Promise<void>;
  list(): Promise<Category[]>;
  findById(category_id: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
}
