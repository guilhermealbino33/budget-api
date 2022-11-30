import { inject, injectable } from 'tsyringe';
import pdf from 'html-pdf';
import ejs from 'ejs';
import { AppError } from '../../../shared/errors/AppError';
import { IBudgetsRepository } from '../repositories/IBudgetsRepository';
import { ISalesmenRepository } from '../../salesmen/repositories/ISalesmenRepository';
import { ICustomersRepository } from '../../customers/repositories/ICustomersRepository';
import { formatDate } from '../utils/date';

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
    const customerReceived = await this.customersRepository.findById(
      budgetReceived.customer_id
    );

    const cover = {
      customer: {
        name: customerReceived.name,
        contact: `Fone: ${customerReceived.phone_number_1} - E-mail: ${customerReceived.email}`,
        address: `${customerReceived.city.name} - ${customerReceived.state.uf}`,
      },
      budget: {
        code: budgetReceived.code,
        products: budgetReceived.products,
        total_value: budgetReceived.total_value,
      },
    };

    ejs.renderFile(
      'src/modules/budgets/templates/html/cover-template.ejs',
      {
        name: cover.customer.name,
        contact: cover.customer.contact,
        address: cover.customer.address,
        date: formatDate(new Date()),
      },
      (err, html) => {
        if (err) {
          console.log(err);
          throw new AppError('Error converting Html file', 500);
        }

        pdf
          .create(html, { format: 'A4' })
          .toFile('tmp/pdf/pdf-name.pdf', (err, res) => {
            if (err) {
              throw new AppError('Error creating PDF.', 500);
            } else {
              console.log(res);
            }
          });
      }
    );
  }
}
