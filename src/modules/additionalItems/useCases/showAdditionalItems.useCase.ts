import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IAdditionalItemsRepository } from '../repositories/IAdditionalItemsRepository';

@injectable()
export default class ShowAdditionalItemUseCase {
  constructor(
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(additionalItemId?: string) {
    if (additionalItemId) {
      if (!isValidId(additionalItemId)) {
        throw new AppError('Invalid id!', 400);
      }

      const additionalItem = await this.additionalItemsRepository.findById(
        additionalItemId
      );

      if (!additionalItem) {
        throw new AppError('Additional item not found!', 404);
      }

      return additionalItem;
    }

    const additionalItems = await this.additionalItemsRepository.list();

    if (!additionalItems.length) {
      logging.debug('No additional items found!');
    }

    return additionalItems;
  }
}
