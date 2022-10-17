import { inject, injectable } from 'tsyringe';
import pdf from 'html-pdf';
import ejs from 'ejs';
import { AppError } from '../../../shared/errors/AppError';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
import { ISalesmenRepository } from '../../salesmen/repositories/ISalesmenRepository';
import { ICustomersRepository } from '../../customers/repositories/ICustomersRepository';

@injectable()
export default class ConvertToPdfUseCase {
  constructor(
    @inject('BudgetsRepository')
    private budgetsRepository: IBudgetsRepository,
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}
  async execute(id: string) {
    const budgetReceived = await this.budgetsRepository.findById(id);
    const customerReceived = await this.salesmenRepository.findById(
      budgetReceived.customer_id
    );
    const salesmanReceived = await this.customersRepository.findById(
      budgetReceived.salesman_id
    );

    const data = {
      customer: {
        name: customerReceived.name,
      },
      salesman: {
        name: salesmanReceived.name,
      },
      budget: {
        code: budgetReceived.code,
        total_value: budgetReceived.total_value,
      },
    };

    ejs.renderFile('./templates/html/budget.ejs', data, (err, html) => {
      if (err) {
        throw new AppError('Bad Request', 500);
      }

      pdf
        .create(html, { format: 'A4' })
        .toFile('./pdf-name.pdf', (err, res) => {
          if (err) {
            throw new AppError('Error creating PDF.', 500);
          }
        });
    });
  }
}
