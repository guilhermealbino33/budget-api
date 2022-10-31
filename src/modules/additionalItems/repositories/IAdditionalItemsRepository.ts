import {
  IAdditionalItem,
  AdditionalItem,
} from '../../../entities/additionalItem';
import Page from '../../../shared/types/page';

export interface IAdditionalItemsRepository {
  create(additionalItem: IAdditionalItem): Promise<IAdditionalItem>;
  update(id: string, data: IAdditionalItem): Promise<void>;
  save(additionalItem: IAdditionalItem): Promise<void>;
  delete(additionalItemID: string): Promise<void>;
  findById(additionalItem_id: string): Promise<AdditionalItem>;
  list(page: number, limit: number): Promise<Page<AdditionalItem>>;
  findByName(
    page: number,
    limit: number,
    name: string
  ): Promise<Page<AdditionalItem>>;
  findByCode(code: string): Promise<AdditionalItem>;
}
