import { ILike, Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import {
  IAdditionalItem,
  AdditionalItem,
} from '../../../../entities/additionalItem';
import Page from '../../../../shared/types/page';

import { IAdditionalItemsRepository } from '../IAdditionalItemsRepository';

export default class AdditionalItemsRepository
  implements IAdditionalItemsRepository
{
  private repository: Repository<AdditionalItem>;

  constructor() {
    this.repository = AppDataSource.getRepository(AdditionalItem);
  }

  async create(additionalItem: IAdditionalItem): Promise<IAdditionalItem> {
    const additionalItemToCreate = this.repository.create(additionalItem);
    this.repository.save(additionalItemToCreate);

    return additionalItemToCreate;
  }

  async update(id: string, data: IAdditionalItem): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  async save(additionalItem: IAdditionalItem): Promise<void> {
    this.repository.save(additionalItem);
  }

  async delete(additionalItemID: string): Promise<void> {
    this.repository.delete(additionalItemID);
  }

  async findById(additional_item_id: string): Promise<AdditionalItem> {
    return this.repository.findOne({
      where: [
        {
          id: additional_item_id,
        },
      ],
    });
  }

  async list(page: number, limit: number): Promise<Page<AdditionalItem>> {
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
    nameSearch: string
  ): Promise<Page<AdditionalItem>> {
    const skip = (page - 1) * limit;
    const products = await this.repository.find({
      where: { name: ILike(`%${nameSearch}%`) },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    const totalDocuments = await this.repository.count();
    const totalPages = Math.ceil(totalDocuments / limit);

    return { content: products, page, totalPages, totalDocuments };
  }

  async findByCode(code: string): Promise<AdditionalItem> {
    return this.repository.findOne({
      where: [
        {
          code,
        },
      ],
    });
  }
}
