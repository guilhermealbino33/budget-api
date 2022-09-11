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
    const customerAlreadyExists = await this.customersRepository.findByCpf(
      customer.cpf
    );

    if (customerAlreadyExists) {
      throw new AppError('Customer already exists!', 409);
    }

    const city = await this.citiesRepository.findByCode(customer.city_code);

    if (!city) {
      throw new AppError('City not found!', 404);
    }

    const state = await this.statesRepository.findByCode(city.state_code);
    customer.city = city;
    customer.state = state.uf;

    await this.customersRepository.create(customer);
  }
}
