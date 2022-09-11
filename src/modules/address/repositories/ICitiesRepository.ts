import { ICity } from '../../../entities/city';

export interface ICitiesRepository {
  findByCode(code: string): Promise<ICity>;
  findByName(name: string): Promise<ICity>;
}
