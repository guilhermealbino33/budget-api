import { ProductImage } from '../../../entities/productImage';

export interface IProductsImagesRepository {
  create(product_id: string, img_url: string): Promise<ProductImage>;
}
