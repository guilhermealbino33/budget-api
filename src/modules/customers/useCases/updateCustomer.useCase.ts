/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../../../entities/customer';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICitiesRepository } from '../../address/repositories/ICitiesRepository';
import { IStatesRepository } from '../../address/repositories/IStatesRepository';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

interface IUpdateCustomerRequest {
  name?: string;
  email?: string;
  cpf?: string;
  cnpj?: string;
  ie?: string;
  city_code?: string;
  state?: string;
  address?: string;
  address_number?: string;
  cep?: string;
  phone_number_1?: string;
  phone_number_2?: string;
  birthday?: Date;
}

@injectable()
export default class UpdateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) {}

  async execute(id: string, customer: IUpdateCustomerRequest) {
    if (!isValidId(id)) {
      throw new AppError('Invalid customer id!', 400);
    }

    const customerToUpdate = await this.customersRepository.findById(id);

    if (!customerToUpdate) {
      throw new AppError('Customer not found!', 404);
    }

    if (customer.city_code) {
      const city = await this.citiesRepository.findByCode(customer.city_code);

      if (!city) {
        throw new AppError('City not found!', 404);
      }

      const state = await this.statesRepository.findByCode(city.state_code);
      customerToUpdate.city = city;
      customerToUpdate.state = state.uf;
    }

    await this.updateCustomer(customerToUpdate, customer);

    return this.customersRepository.updateCustomer(customerToUpdate);
  }

  private async updateCustomer(
    customerToUpdate: ICustomer,
    customer: IUpdateCustomerRequest
  ) {
    customerToUpdate.name = customer.name
      ? customer.name
      : customerToUpdate.name;
    customerToUpdate.email = customer.email
      ? customer.email
      : customerToUpdate.email;
    customerToUpdate.cpf = customer.cpf ? customer.cpf : customerToUpdate.cpf;

    customerToUpdate.address = customer.address
      ? customer.address
      : customerToUpdate.address;
    customerToUpdate.address_number = customer.address_number
      ? customer.address_number
      : customerToUpdate.address_number;
    customerToUpdate.cep = customer.cep ? customer.cep : customerToUpdate.cep;
    customerToUpdate.birthday = customer.birthday
      ? customer.birthday
      : customerToUpdate.birthday;
    customerToUpdate.updated_at = new Date();

    return customerToUpdate;
  }
}
