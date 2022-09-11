import { In, Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { IProduct, Product } from '../../../../entities/product';

import { IProductsRepository } from '../IProductsRepository';

export default class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = AppDataSource.getRepository(Product);
  }

  async create(product: IProduct): Promise<void> {
    const productToCreate = this.repository.create(product);
    this.repository.save(productToCreate);
  }

  async updateProduct(product: IProduct): Promise<void> {
    this.repository.save(product);
  }

  async deleteProduct(productID: string): Promise<void> {
    this.repository.delete(productID);
  }

  async findById(product_id: string): Promise<Product> {
    return this.repository.findOne({
      where: [
        {
          id: product_id,
        },
      ],
    });
  }

  async findByIds(product_id: string[]): Promise<Product[]> {
    return this.repository.find({
      where: [
        {
          id: In([product_id]),
        },
      ],
    });
  }

  async findBySku(sku: string): Promise<Product> {
    return this.repository.findOne({
      where: [
        {
          sku,
        },
      ],
    });
  }
}
