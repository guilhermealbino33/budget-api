/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { ISalesman } from '../../../entities/salesman';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICitiesRepository } from '../../address/repositories/ICitiesRepository';
import { IStatesRepository } from '../../address/repositories/IStatesRepository';
import { ISalesmenRepository } from '../repositories/ISalesmenRepository';

@injectable()
export default class UpdateSalesmanUseCase {
  constructor(
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository,
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
      city_code,
      address,
      address_number,
      cep,
      phone_number_1,
      phone_number_2,
      account_type,
      district,
      complement,
    }: ISalesman
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid salesman id!', 400);
    }

    let data = {};

    const salesmanToUpdate = await this.salesmenRepository.findById(id);

    if (!salesmanToUpdate) {
      throw new AppError('Salesman not found!', 404);
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

    return this.salesmenRepository.update(id, data);
  }
}
