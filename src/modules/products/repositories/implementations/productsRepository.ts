import { ILike, In, Like, Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { IProduct, Product } from '../../../../entities/product';
import Page from '../../../../shared/types/page';

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

  async update(id: string, data: IProduct): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
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

  async findByCode(code: string): Promise<Product> {
    return this.repository.findOne({
      where: [
        {
          code,
        },
      ],
    });
  }

  async list(page: number, limit: number): Promise<Page<Product>> {
    const skip = (page - 1) * limit;
    const products = await this.repository.find({
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: products, page, totalPages, totalDocuments };
  }

  async findByName(
    page: number,
    limit: number,
    nameSer: string
  ): Promise<Page<Product>> {
    const skip = (page - 1) * limit;
    const products = await this.repository.find({
      where: { name: ILike(`%${nameSer}%`) },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: products, page, totalPages, totalDocuments };
  }

  async count(): Promise<number> {
    return this.repository.count();
  }
}
