import { ProductImage } from '../../../entities/productImage';

export interface IProductsImagesRepository {
  create(product_id: string, image_name: string): Promise<ProductImage>;
}
