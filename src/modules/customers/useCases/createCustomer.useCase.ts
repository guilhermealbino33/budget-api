import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../../../entities/customer';
import { AppError } from '../../../shared/errors/AppError';
import { ICitiesRepository } from '../../address/repositories/ICitiesRepository';
import { IStatesRepository } from '../../address/repositories/IStatesRepository';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

@injectable()
export default class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) {}

  async execute(customer: ICustomer) {
    if (!customer.cpf && !customer.cnpj) {
      throw new AppError('CPF or CNPJ must be informed!', 400);
    }

    if (await this.customerAlreadyExists(customer)) {
      throw new AppError('Customer already exists!', 409);
    }

    const city = await this.citiesRepository.findByCode(customer.city_code);

    if (!city) {
      throw new AppError('City not found!', 404);
    }

    const state = await this.statesRepository.findByCode(city.state_code);
    customer.city = city;
    customer.state = state;

    await this.customersRepository.create(customer);
  }

  private async customerAlreadyExists(customer: ICustomer): Promise<ICustomer> {
    let customerAlreadyExists: ICustomer;

    if (customer.cpf) {
      customerAlreadyExists = await this.customersRepository.findByCpf(
        customer.cpf
      );
    } else if (customer.cnpj) {
      customerAlreadyExists = await this.customersRepository.findByCnpj(
        customer.cnpj
      );
    }

    return customerAlreadyExists;
  }
}
