import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IAdditionalItemsRepository } from '../repositories/IAdditionalItemsRepository';

@injectable()
export default class ShowAdditionalItemUseCase {
  constructor(
    @inject('AdditionalItemsRepository')
    private additionalItemsRepository: IAdditionalItemsRepository
  ) {}

  async execute(additionalItemId: string) {
    const additionalItem = await this.additionalItemsRepository.findById(
      additionalItemId
    );

    if (!additionalItem) {
      throw new AppError('Additional item not found!', 404);
    }

    return additionalItem;
  }
}
