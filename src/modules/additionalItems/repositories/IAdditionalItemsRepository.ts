import {
  IAdditionalItem,
  AdditionalItem,
} from '../../../entities/additionalItem';

export interface IAdditionalItemsRepository {
  create(additionalItem: IAdditionalItem): Promise<void>;
  update(id: string, data: IAdditionalItem): Promise<void>;
  save(additionalItem: IAdditionalItem): Promise<void>;
  delete(additionalItemID: string): Promise<void>;
  findById(additionalItem_id: string): Promise<AdditionalItem>;
  findByIds(additional_item_id: string[]): Promise<AdditionalItem[]>;
  findByCode(code: string): Promise<AdditionalItem>;
}
