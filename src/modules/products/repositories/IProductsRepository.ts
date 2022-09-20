import { IProduct, Product } from '../../../entities/product';

export interface IProductsRepository {
  create(product: IProduct): Promise<void>;
  updateProduct(id: string, data: IProduct): Promise<void>;
  deleteProduct(productID: string): Promise<void>;
  findById(product_id: string): Promise<Product>;
  findByIds(product_id: string[]): Promise<Product[]>;
  findByCode(code: string): Promise<Product>;
  list(): Promise<Product[]>;
}
