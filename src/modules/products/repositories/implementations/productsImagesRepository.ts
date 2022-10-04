import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { ProductImage } from '../../../../entities/productImage';
import { IProductsImagesRepository } from '../IProductsImagesRepository';

export default class ProductsImagesRepository
  implements IProductsImagesRepository
{
  private repository: Repository<ProductImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductImage);
  }

  async create(product_id: string, img_url: string): Promise<ProductImage> {
    const productImage = this.repository.create({ product_id, img_url });

    await this.repository.save(productImage);

    return productImage;
  }
}
