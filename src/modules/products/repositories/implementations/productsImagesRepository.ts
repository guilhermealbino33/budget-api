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

  async create(
    product_id: string,
    file_name: string,
    img_url: string
  ): Promise<ProductImage> {
    const productImage = this.repository.create({
      product_id,
      file_name,
      img_url,
    });

    await this.repository.save(productImage);

    return productImage;
  }

  async delete(id: string): Promise<void> {
    this.repository.delete({ id });
  }

  async findById(id: string): Promise<ProductImage> {
    return this.repository.findOneBy({ id });
  }
}
