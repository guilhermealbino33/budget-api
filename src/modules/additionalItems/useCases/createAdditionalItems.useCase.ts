import { inject, injectable } from 'tsyringe';
import { IAdditionalItem } from '../../../entities/additionalItem';
import { AppError } from '../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../repositories/IAdditionalItemsRepository';

@injectable()
export default class CreateAdditionalItemUseCase {
  constructor(
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(additionalItem: IAdditionalItem) {
    const additionalItemAlreadyExists =
      await this.additionalItemsRepository.findByCode(additionalItem.code);

    if (additionalItemAlreadyExists) {
      throw new AppError('Additional item already exists!', 409);
    }

    if (!additionalItem.name) {
      throw new AppError('Additional item must have a name!', 400);
    }

    if (!additionalItem.list_price) {
      throw new AppError('Additional item must have a list price!', 400);
    }

    await this.additionalItemsRepository.create(additionalItem);
  }
}
