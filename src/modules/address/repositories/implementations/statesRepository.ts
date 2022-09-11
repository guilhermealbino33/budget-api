import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { IState, State } from '../../../../entities/state';
import { IStatesRepository } from '../IStatesRepository';

export default class StatesRepository implements IStatesRepository {
  private repository: Repository<State>;

  constructor() {
    this.repository = AppDataSource.getRepository(State);
  }

  async findByCode(code: string): Promise<IState> {
    return this.repository.findOne({
      where: [
        {
          code,
        },
      ],
    });
  }
}
