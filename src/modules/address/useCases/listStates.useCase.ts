import { inject, injectable } from 'tsyringe';
import logging from '../../../shared/config/logging';
import { AppError } from '../../../shared/errors/AppError';
import { IStatesRepository } from '../repositories/IStatesRepository';

@injectable()
export default class ListStatesUseCase {
  constructor(
    @inject('StatesRepository')
    private statesRepository: IStatesRepository
  ) {}

  async execute(stateCode?: string) {
    if (stateCode) {
      const state = await this.statesRepository.findByCode(stateCode);

      if (!state) {
        throw new AppError('State not found!', 404);
      }

      return state;
    }

    const states = await this.statesRepository.list();

    if (!states.length) {
      logging.debug('No states found!');
    }

    return states;
  }
}
