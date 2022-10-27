import { ICustomer, Customer } from '../../../entities/customer';
import Page from '../../../shared/types/page';

export interface ICustomersRepository {
  create(customer: ICustomer): Promise<void>;
  update(id: string, data: ICustomer): Promise<void>;
  deleteCustomer(customerID: string): Promise<void>;
  findById(customer_id: string): Promise<Customer>;
  findByCpf(cpf: string): Promise<Customer>;
  findByCnpj(cnpj: string): Promise<Customer>;
  list(page: number, limit: number): Promise<Page<Customer>>;
  count(): Promise<number>;
}
