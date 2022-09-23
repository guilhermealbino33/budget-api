import { inject, injectable } from 'tsyringe';
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
      throw new AppError('No additional items found!', 404);
    }

    return additionalItems;
  }
}
