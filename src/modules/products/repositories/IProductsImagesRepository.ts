import { ProductImage } from '../../../entities/productImage';

export interface IProductsImagesRepository {
  create(
    product_id: string,
    file_name: string,
    img_url: string
  ): Promise<ProductImage>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ProductImage>;
}
