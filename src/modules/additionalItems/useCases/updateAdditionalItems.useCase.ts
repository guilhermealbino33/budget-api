/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { IAdditionalItem } from '../../../entities/additionalItem';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IAdditionalItemsRepository } from '../repositories/IAdditionalItemsRepository';

@injectable()
export default class UpdateAdditionalItemUseCase {
  constructor(
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(
    id: string,
    { name, code, description, size }: IAdditionalItem
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid additionalItem id!', 400);
    }

    let data = {} as IAdditionalItem;

    const additionalItemToUpdate =
      await this.additionalItemsRepository.findById(id);

    if (!additionalItemToUpdate) {
      throw new AppError('AdditionalItem not found!', 404);
    }

    if (name) {
      data = { ...data, name };
    }

    if (code) {
      throw new AppError('Additional item code can not be changed!', 400);
    }

    if (description) {
      data = { ...data, description };
    }

    if (size) {
      data = { ...data, size };
    }

    return this.additionalItemsRepository.update(id, data);
  }
}
