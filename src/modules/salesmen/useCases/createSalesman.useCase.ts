import { inject, injectable } from 'tsyringe';
import { ISalesman } from '../../../entities/salesman';
import { AppError } from '../../../shared/errors/AppError';
import { ICitiesRepository } from '../../address/repositories/ICitiesRepository';
import { IStatesRepository } from '../../address/repositories/IStatesRepository';
import { ISalesmenRepository } from '../repositories/ISalesmenRepository';

@injectable()
export default class CreateSalesmanUseCase {
  constructor(
    @inject('SalesmenRepository')
    private salesmenRepository: ISalesmenRepository,
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) {}

  async execute(salesman: ISalesman) {
    if (!salesman.cpf && !salesman.cnpj) {
      throw new AppError('CPF or CNPJ must be informed!', 400);
    }

    if (await this.salesmanAlreadyExists(salesman)) {
      throw new AppError('Salesman already exists!', 403);
    }

    const city = await this.citiesRepository.findByCode(salesman.city_code);

    if (!city) {
      throw new AppError('City not found!', 404);
    }

    const state = await this.statesRepository.findByCode(city.state_code);
    salesman.city = city;
    salesman.state = state;

    await this.salesmenRepository.create(salesman);
  }

  private async salesmanAlreadyExists(salesman: ISalesman): Promise<ISalesman> {
    let salesmanAlreadyExists: ISalesman;

    if (salesman.cpf) {
      salesmanAlreadyExists = await this.salesmenRepository.findByCpf(
        salesman.cpf
      );
    } else {
      salesmanAlreadyExists = await this.salesmenRepository.findByCnpj(
        salesman.cnpj
      );
    }

    return salesmanAlreadyExists;
  }
}
