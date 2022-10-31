import { IProduct, Product } from '../../../entities/product';
import Page from '../../../shared/types/page';

export interface IProductsRepository {
  create(product: IProduct): Promise<void>;
  update(id: string, data: IProduct): Promise<void>;
  deleteProduct(productID: string): Promise<void>;
  findById(product_id: string): Promise<Product>;
  findByIds(product_id: string[]): Promise<Product[]>;
  findByCode(code: string): Promise<Product>;
  list(page: number, limit: number): Promise<Page<Product>>;
  findByName(
    page: number,
    limit: number,
    nameSearch: string
  ): Promise<Page<Product>>;
  count(): Promise<number>;
}
