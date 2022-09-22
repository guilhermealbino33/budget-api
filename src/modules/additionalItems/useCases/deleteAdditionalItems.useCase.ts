import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IAdditionalItemsRepository } from '../repositories/IAdditionalItemsRepository';

@injectable()
export default class DeleteAdditionalItemUseCase {
  constructor(
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(additionalItemId: string) {
    if (!isValidId(additionalItemId)) {
      throw new AppError('Invalid additional item id!', 400);
    }

    const additionalItemToDelete =
      await this.additionalItemsRepository.findById(additionalItemId);

    if (!additionalItemToDelete) {
      throw new AppError('Additional item not found!', 404);
    }

    await this.additionalItemsRepository.delete(additionalItemId);
  }
}
