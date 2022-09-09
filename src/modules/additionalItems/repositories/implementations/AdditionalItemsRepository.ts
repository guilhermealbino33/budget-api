import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import {
  IAdditionalItem,
  AdditionalItem,
} from '../../../../entities/additionalItem';

import { IAdditionalItemsRepository } from '../IAdditionalItemsRepository';

export default class AdditionalItemsRepository
  implements IAdditionalItemsRepository
{
  private repository: Repository<AdditionalItem>;

  constructor() {
    this.repository = AppDataSource.getRepository(AdditionalItem);
  }

  async create(additionalItem: IAdditionalItem): Promise<void> {
    const additionalItemToCreate = this.repository.create(additionalItem);
    this.repository.save(additionalItemToCreate);
  }

  async updateAdditionalItem(additionalItem: IAdditionalItem): Promise<void> {
    this.repository.save(additionalItem);
  }

  async deleteAdditionalItem(additionalItemID: string): Promise<void> {
    this.repository.delete(additionalItemID);
  }

  async findById(additionalItem_id: string): Promise<AdditionalItem> {
    return this.repository.findOne({
      where: [
        {
          id: additionalItem_id,
        },
      ],
    });
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
