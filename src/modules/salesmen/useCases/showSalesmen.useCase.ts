import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { ISalesmenRepository } from '../repositories/ISalesmenRepository';

@injectable()
export default class ShowSalesmenUseCase {
  constructor(
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository
  ) {}

  async execute() {
    const salesman = await this.salesmenRepository.list();

    if (!salesman.length) {
      logging.debug('No salesman found!');
    }

    return salesman;
  }
}
