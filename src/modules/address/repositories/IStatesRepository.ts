import { State, IState } from '../../../entities/state';

export interface IStatesRepository {
  findByCode(code: string): Promise<IState>;
  list(): Promise<State[]>;
}
