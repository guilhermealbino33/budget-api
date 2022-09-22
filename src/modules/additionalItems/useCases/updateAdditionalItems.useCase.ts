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
    { code, name, size, description }: IAdditionalItem
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid additionalItem id!', 400);
    }

    let data = {};

    const additionalItemToUpdate =
      await this.additionalItemsRepository.findById(id);

    if (!additionalItemToUpdate) {
      throw new AppError('AdditionalItem not found!', 404);
    }

    const productToUpdate = await this.additionalItemsRepository.findById(id);

    if (!productToUpdate) {
      throw new AppError('Product not found!', 404);
    }

    if (name) {
      data = { ...data, description };
    }

    if (description) {
      data = { ...data, description };
    }

    if (code) {
      data = { ...data, code };
    }

    if (size) {
      data = { ...data, size };
    }

    return this.additionalItemsRepository.update(id, data);
  }
}
