import { ISalesman, Salesman } from '../../../entities/salesman';

export interface ISalesmanRepository {
  create(salesman: ISalesman): Promise<void>;
  update(id: string, salesman: ISalesman): Promise<void>;
  deleteSalesman(salesmanID: string): Promise<void>;
  findById(salesman_id: string): Promise<Salesman>;
  findByCpf(cpf: string): Promise<Salesman>;
  findByCnpj(cnpj: string): Promise<Salesman>;
  list(): Promise<Salesman[]>;
}
