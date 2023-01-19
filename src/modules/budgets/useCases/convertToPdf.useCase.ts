import { inject, injectable } from 'tsyringe';
import puppeteer from 'puppeteer';
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

    if (!budgetReceived) {
      throw new AppError('Budget not found!', 404);
    }

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
        delivery_type: budgetReceived.delivery_type,
      },
      products: budgetReceived.products,
    };

    const pdf = ejs.renderFile(
      'src/modules/budgets/templates/html/budget-template.ejs',

      {
        customer_name: data.customer.name,
        customer_contact: data.customer.contact,
        customer_address: data.customer.address,
        date: formatDate(new Date()),
        budget_code: data.budget.code,
        budget_year: data.budget.year,
        products: data.budget.products,
        total_value: data.budget.total_value,
        salesman_name: data.salesman.name,
        delivery_type: data.budget.delivery_type,
      },
      async (err, html) => {
        if (err) {
          throw new AppError(`Error converting Html file: ${err}`, 500);
        }

        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setContent(html);
        const pdf = await page.pdf({
          path: 'tmp/pdf/pdf-name.pdf',
          format: 'A4',
          printBackground: true,
        });
        await browser.close();

        return pdf;
      }
    );

    return pdf;
  }
}
