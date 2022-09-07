import { IProduct, Product } from '../../../entities/product';

export interface IProductsRepository {
  create(product: IProduct): Promise<void>;
  updateProduct(product: IProduct): Promise<void>;
  deleteProduct(productID: string): Promise<void>;
  findById(product_id: string): Promise<Product>;
  findBySku(sku: string): Promise<Product>;
}
