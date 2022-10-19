import { City, ICity } from '../../../entities/city';

export interface ICitiesRepository {
  findByCode(code: string): Promise<ICity>;
  findByName(name: string): Promise<ICity>;
  list(): Promise<City[]>;
  listByStateCode(state_code: string): Promise<City[]>;
}
