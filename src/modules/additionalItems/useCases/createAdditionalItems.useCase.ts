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

    await this.additionalItemsRepository.create(additionalItem);
  }
}
