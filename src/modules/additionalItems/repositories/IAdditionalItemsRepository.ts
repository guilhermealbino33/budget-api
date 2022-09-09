import {
  IAdditionalItem,
  AdditionalItem,
} from '../../../entities/additionalItem';

export interface IAdditionalItemsRepository {
  create(additionalItem: IAdditionalItem): Promise<void>;
  updateAdditionalItem(additionalItem: IAdditionalItem): Promise<void>;
  deleteAdditionalItem(additionalItemID: string): Promise<void>;
  findById(additionalItem_id: string): Promise<AdditionalItem>;
  findByCode(code: string): Promise<AdditionalItem>;
}
