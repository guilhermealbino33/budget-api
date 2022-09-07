/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ISalesmanRepository } from '../repositories/ISalesmanRepository';

interface UpdateSalesmanRequest {
  name?: string;
  email?: string;
  cpf?: string;
  city?: string;
  state?: string;
  address?: string;
  address_number?: string;
  cep?: string;
  birthday?: Date;
}

@injectable()
export default class UpdateSalesmanUseCase {
  constructor(
    @inject('SalesmanRepository')
    private salesmanRepository: ISalesmanRepository
  ) {}

  async execute(
    id: string,
    {
      name,
      email,
      cpf,
      city,
      state,
      address,
      address_number,
      cep,
      birthday,
    }: UpdateSalesmanRequest
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid salesman id!', 400);
    }

    const salesmanToUpdate = await this.salesmanRepository.findById(id);

    if (!salesmanToUpdate) {
      throw new AppError('Salesman not found!', 404);
    }

    salesmanToUpdate.name = name ? name : salesmanToUpdate.name;
    salesmanToUpdate.email = email ? email : salesmanToUpdate.email;
    salesmanToUpdate.cpf = cpf ? cpf : salesmanToUpdate.cpf;
    salesmanToUpdate.city = city;
    salesmanToUpdate.state = state ? state : salesmanToUpdate.state;
    salesmanToUpdate.address = address ? address : salesmanToUpdate.address;
    salesmanToUpdate.address_number = address_number
      ? address_number
      : salesmanToUpdate.address_number;
    salesmanToUpdate.cep = cep ? cep : salesmanToUpdate.cep;
    salesmanToUpdate.birthday = birthday ? birthday : salesmanToUpdate.birthday;

    salesmanToUpdate.updated_at = new Date();

    return this.salesmanRepository.updateSalesman(salesmanToUpdate);
  }
}
