/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../../../entities/customer';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICitiesRepository } from '../../address/repositories/ICitiesRepository';
import { IStatesRepository } from '../../address/repositories/IStatesRepository';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

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

  async execute(
    id: string,
    {
      name,
      email,
      cpf,
      cnpj,
      ie,
      requester,
      city_code,
      address,
      address_number,
      cep,
      phone_number_1,
      phone_number_2,
      account_type,
      district,
      complement,
    }: ICustomer
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid customer id!', 400);
    }

    let data = {};

    const customerToUpdate = await this.customersRepository.findById(id);

    if (!customerToUpdate) {
      throw new AppError('Customer not found!', 404);
    }

    if (city_code) {
      const city = await this.citiesRepository.findByCode(city_code);

      if (!city) {
        throw new AppError('City not found!', 404);
      }

      const state = await this.statesRepository.findByCode(city.state_code);

      data = { ...data, city, state, city_code };
    }

    if (name) {
      data = { ...data, name };
    }

    if (email) {
      data = { ...data, email };
    }

    if (account_type) {
      data = { ...data, account_type };
    }

    if (cpf) {
      data = { ...data, cpf };
    }

    if (cnpj) {
      data = { ...data, cnpj };
    }

    if (ie) {
      data = { ...data, ie };
    }

    if (requester) {
      data = { ...data, requester };
    }

    if (address) {
      data = { ...data, address };
    }

    if (address_number) {
      data = { ...data, address_number };
    }

    if (cep) {
      data = { ...data, cep };
    }

    if (phone_number_1) {
      data = { ...data, phone_number_1 };
    }

    if (phone_number_2) {
      data = { ...data, phone_number_2 };
    }

    if (district) {
      data = { ...data, district };
    }

    if (complement) {
      data = { ...data, complement };
    }

    return this.customersRepository.update(id, data);
  }
}
