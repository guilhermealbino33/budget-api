/* eslint-disable no-unneeded-ternary */
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { isValidId } from '../../../shared/utils/idValidator';
import { ICustomersRepository } from '../repositories/ICustomersRepository';

interface UpdateCustomerRequest {
  name?: string;
  cpf?: string;
  city?: string;
  state?: string;
  address?: string;
  number?: string;
  cep?: string;
  birthday?: Date;
}

@injectable()
export default class UpdateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository
  ) {}

  async execute(
    id: string,
    {
      name,
      cpf,
      city,
      state,
      address,
      number,
      cep,
      birthday,
    }: UpdateCustomerRequest
  ) {
    if (!isValidId(id)) {
      throw new AppError('Invalid customer id!', 400);
    }

    const customerToUpdate = await this.customersRepository.findById(id);

    if (!customerToUpdate) {
      throw new AppError('Customer not found!', 404);
    }

    customerToUpdate.name = name ? name : customerToUpdate.name;
    customerToUpdate.cpf = cpf ? cpf : customerToUpdate.cpf;
    customerToUpdate.city = city;
    customerToUpdate.state = state ? state : customerToUpdate.state;
    customerToUpdate.address = address ? address : customerToUpdate.address;
    customerToUpdate.number = number ? number : customerToUpdate.number;
    customerToUpdate.cep = cep ? cep : customerToUpdate.cep;
    customerToUpdate.birthday = birthday ? birthday : customerToUpdate.birthday;

    customerToUpdate.updated_at = new Date();

    return this.customersRepository.updateCustomer(customerToUpdate);
  }
}
