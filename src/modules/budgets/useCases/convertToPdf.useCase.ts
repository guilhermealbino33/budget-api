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
    const salesmanReceived = await this.salesmenRepository.findById(
      budgetReceived.salesman_id
    );

    const data = {
      customer: {
        name: customerReceived.name,
        contact: `Fone: ${customerReceived.phone_number_1} - E-mail: ${customerReceived.email}`,
        address: `${customerReceived.city.name} - ${customerReceived.state.uf}`,
      },
      salesman: {
        name: salesmanReceived.name,
      },
      budget: {
        code: budgetReceived.code,
        year: new Date().getFullYear(),
        products: budgetReceived.products,
        total_value: budgetReceived.total_value,
      },
      products: budgetReceived.products,
    };

    ejs.renderFile(
      'src/modules/budgets/templates/html/cover-template.ejs',

      {
        customer_name: data.customer.name,
        customer_contact: data.customer.contact,
        customer_address: data.customer.address,
        date: formatDate(new Date()),
        budget_code: data.budget.code,
        budget_year: data.budget.year,
        // product_image: 'url',
        // product_description: '',
        // product_quantity: '',
        // product_installation_area: '',
        // product_delivery_method: '',
        // product_observations: '',
        products: data.budget.products,
        total_value: data.budget.total_value,
        salesman_name: data.salesman.name,
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
            }
          });
      }
    );
  }
}
