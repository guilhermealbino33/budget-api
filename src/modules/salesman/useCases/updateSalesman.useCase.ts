/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { ISalesman } from '../../../entities/salesman';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICitiesRepository } from '../../address/repositories/ICitiesRepository';
import { IStatesRepository } from '../../address/repositories/IStatesRepository';
import { ISalesmanRepository } from '../repositories/ISalesmanRepository';

interface IUpdateSalesmanRequest {
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
export default class UpdateSalesmanUseCase {
  constructor(
    @inject('SalesmanRepository')
    private salesmanRepository: ISalesmanRepository,
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) {}

  async execute(id: string, salesman: IUpdateSalesmanRequest) {
    if (!isValidId(id)) {
      throw new AppError('Invalid salesman id!', 400);
    }

    const salesmanToUpdate = await this.salesmanRepository.findById(id);

    if (!salesmanToUpdate) {
      throw new AppError('Salesman not found!', 404);
    }

    if (salesman.city_code) {
      const city = await this.citiesRepository.findByCode(salesman.city_code);

      if (!city) {
        throw new AppError('City not found!', 404);
      }

      const state = await this.statesRepository.findByCode(city.state_code);
      salesmanToUpdate.city = city;
      salesmanToUpdate.state = state.uf;
    }

    await this.updateSalesman(salesmanToUpdate, salesman);

    return this.salesmanRepository.updateSalesman(salesmanToUpdate);
  }

  private async updateSalesman(
    salesmanToUpdate: ISalesman,
    salesman: IUpdateSalesmanRequest
  ) {
    salesmanToUpdate.name = salesman.name
      ? salesman.name
      : salesmanToUpdate.name;
    salesmanToUpdate.email = salesman.email
      ? salesman.email
      : salesmanToUpdate.email;
    salesmanToUpdate.cpf = salesman.cpf ? salesman.cpf : salesmanToUpdate.cpf;

    salesmanToUpdate.address = salesman.address
      ? salesman.address
      : salesmanToUpdate.address;
    salesmanToUpdate.address_number = salesman.address_number
      ? salesman.address_number
      : salesmanToUpdate.address_number;
    salesmanToUpdate.cep = salesman.cep ? salesman.cep : salesmanToUpdate.cep;
    salesmanToUpdate.birthday = salesman.birthday
      ? salesman.birthday
      : salesmanToUpdate.birthday;
    salesmanToUpdate.updated_at = new Date();

    return salesmanToUpdate;
  }
}
