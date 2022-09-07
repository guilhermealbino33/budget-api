import { inject, injectable } from 'tsyringe';
import { ISalesman } from '../../../entities/salesman';
import { AppError } from '../../../shared/errors/AppError';
import { ISalesmanRepository } from '../repositories/ISalesmanRepository';

@injectable()
export default class CreateSalesmanUseCase {
  constructor(
    @inject('SalesmanRepository')
    private salesmanRepository: ISalesmanRepository
  ) {}

  async execute(salesman: ISalesman) {
    const salesmanAlreadyExists = await this.salesmanRepository.findByCpf(
      salesman.cpf
    );

    if (salesmanAlreadyExists) {
      throw new AppError('Salesman already exists!', 409);
    }

    await this.salesmanRepository.create(salesman);
  }
}
