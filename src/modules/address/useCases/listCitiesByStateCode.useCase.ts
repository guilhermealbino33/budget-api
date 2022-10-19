import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { ICitiesRepository } from '../repositories/ICitiesRepository';

@injectable()
export default class ListCitiesByStateCodeUseCase {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  async execute(state_code: string) {
    const cities = await this.citiesRepository.listByStateCode(state_code);

    if (!cities.length) {
      logging.debug('No cities found!');
    }

    return cities;
  }
}
