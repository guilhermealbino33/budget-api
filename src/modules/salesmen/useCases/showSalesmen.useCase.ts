import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ISalesmenRepository } from '../repositories/ISalesmenRepository';

@injectable()
export default class ShowSalesmenUseCase {
  constructor(
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository
  ) {}

  async execute(page: number, limit: number, id?: string, name?: string) {
    if (id) {
      if (!isValidId(id)) {
        throw new AppError('Invalid id!', 400);
      }

      const customer = await this.salesmenRepository.findById(id);

      if (!customer) {
        throw new AppError('Salesman not found!', 404);
      }

      return customer;
    }

    if (name) {
      const salesmen = await this.salesmenRepository.findByName(
        page,
        limit,
        name
      );

      return salesmen;
    }

    const salesmen = await this.salesmenRepository.list(page, limit);

    if (!salesmen || !salesmen.content.length) {
      logging.debug('No salesmen found!');
    }

    return salesmen;
  }
}
