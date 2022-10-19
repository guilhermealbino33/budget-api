import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { City, ICity } from '../../../../entities/city';

import { ICitiesRepository } from '../ICitiesRepository';

export default class CitiesRepository implements ICitiesRepository {
  private repository: Repository<City>;

  constructor() {
    this.repository = AppDataSource.getRepository(City);
  }

  async findByCode(code: string): Promise<ICity> {
    return this.repository.findOne({
      where: [
        {
          code,
        },
      ],
    });
  }

  async findByName(name: string): Promise<ICity> {
    return this.repository.findOne({
      where: [
        {
          name,
        },
      ],
    });
  }

  async list(): Promise<City[]> {
    return this.repository.find();
  }

  async listByStateCode(state_code: string): Promise<City[]> {
    return this.repository.find({
      where: [
        {
          state_code,
        },
      ],
    });
  }
}
