import { ISalesman, Salesman } from '../../../entities/salesman';
import Page from '../../../shared/types/page';

export interface ISalesmenRepository {
  create(salesman: ISalesman): Promise<void>;
  update(id: string, salesman: ISalesman): Promise<void>;
  deleteSalesman(salesmanID: string): Promise<void>;
  findById(salesman_id: string): Promise<Salesman>;
  findByCpf(cpf: string): Promise<Salesman>;
  findByCnpj(cnpj: string): Promise<Salesman>;
  list(page: number, limit: number): Promise<Page<Salesman>>;
  findByName(
    page: number,
    limit: number,
    name: string
  ): Promise<Page<Salesman>>;
}
