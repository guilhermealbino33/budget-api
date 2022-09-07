import { ICustomer, Customer } from '../../../entities/customer';

export interface ICustomersRepository {
  create(customer: ICustomer): Promise<void>;
  updateCustomer(customer: ICustomer): Promise<void>;
  deleteCustomer(customerID: string): Promise<void>;
  findById(customer_id: string): Promise<Customer>;
  findByCpf(cpf: string): Promise<Customer>;
}