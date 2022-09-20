/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { ISalesman } from '../../../entities/salesman';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICitiesRepository } from '../../address/repositories/ICitiesRepository';
import { IStatesRepository } from '../../address/repositories/IStatesRepository';
import { ISalesmanRepository } from '../repositories/ISalesmanRepository';

@injectable()
export default class UpdateSalesmanUseCase {
  constructor(
    @inject('SalesmanRepository')
    private salesmanRepository: ISalesmanRepository,
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
      state,
      address,
      address_number,
      cep,
      phone_number_1,
      phone_number_2,
      birthday,
    }: ISalesman
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid salesman id!', 400);
    }

    let data = {};

    const salesmanToUpdate = await this.salesmanRepository.findById(id);

    if (!salesmanToUpdate) {
      throw new AppError('Salesman not found!', 404);
    }

    if (city_code) {
      const city = await this.citiesRepository.findByCode(city_code);

      if (!city) {
        throw new AppError('City not found!', 404);
      }

      const state = await this.statesRepository.findByCode(city.state_code);
      salesmanToUpdate.city = city;
      salesmanToUpdate.state = state.uf;
    }

    if (name) {
      data = { ...data, name };
    }

    if (email) {
      data = { ...data, email };
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

    if (city_code) {
      data = { ...data, city_code };
    }

    if (state) {
      data = { ...data, state };
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

    if (birthday) {
      data = { ...data, birthday };
    }

    return this.salesmanRepository.update(id, data);
  }
}
