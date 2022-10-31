import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { IAdditionalItemsRepository } from '../repositories/IAdditionalItemsRepository';

@injectable()
export default class ShowAdditionalItemsUseCase {
  constructor(
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(
    page: number,
    limit: number,
    additionalItemId?: string,
    name?: string
  ) {
    if (additionalItemId) {
      if (!isValidId(additionalItemId)) {
        throw new AppError('Invalid id!', 400);
      }

      const additionalItem = await this.additionalItemsRepository.findById(
        additionalItemId
      );

      if (!additionalItem) {
        throw new AppError('Additional items not found!', 404);
      }

      return additionalItem;
    }

    if (name) {
      const additionalItems = await this.additionalItemsRepository.findByName(
        page,
        limit,
        name
      );

      return additionalItems;
    }

    const additionalItems = await this.additionalItemsRepository.list(
      page,
      limit
    );

    if (!additionalItems.content.length) {
      logging.debug('No additionalItems found!');
    }

    return additionalItems;
  }
}
