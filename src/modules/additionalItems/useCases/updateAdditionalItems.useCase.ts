/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IAdditionalItemsRepository } from '../repositories/IAdditionalItemsRepository';

interface UpdateAdditionalItemRequest {
  code?: string;
  name?: string;
  value?: number;
}

@injectable()
export default class UpdateAdditionalItemUseCase {
  constructor(
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(
    id: string,
    { code, name, value }: UpdateAdditionalItemRequest
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid additionalItem id!', 400);
    }

    const additionalItemToUpdate =
      await this.additionalItemsRepository.findById(id);

    if (!additionalItemToUpdate) {
      throw new AppError('AdditionalItem not found!', 404);
    }

    additionalItemToUpdate.code = code ? code : additionalItemToUpdate.code;
    additionalItemToUpdate.name = name ? name : additionalItemToUpdate.name;
    additionalItemToUpdate.value = value ? value : additionalItemToUpdate.value;

    additionalItemToUpdate.updated_at = new Date();

    return this.additionalItemsRepository.updateAdditionalItem(
      additionalItemToUpdate
    );
  }
}
