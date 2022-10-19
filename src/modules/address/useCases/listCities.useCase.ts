import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { ICitiesRepository } from '../repositories/ICitiesRepository';

@injectable()
export default class ListCitiesUseCase {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  async execute(cityCode?: string) {
    if (cityCode) {
      const city = await this.citiesRepository.findByCode(cityCode);

      if (!city) {
        throw new AppError('City not found!', 404);
      }

      return city;
    }

    const cities = await this.citiesRepository.list();

    if (!cities.length) {
      logging.debug('No cities found!');
    }

    return cities;
  }
}
