import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { IUser, User } from '../../../../entities/user';

import { IUsersRepository } from '../IUsersRepository';

export default class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create(user: IUser): Promise<void> {
    const userToCreate = this.repository.create(user);
    this.repository.save(userToCreate);
  }

  async updateUser(user: IUser): Promise<void> {
    this.repository.save(user);
  }

  async deleteUser(userID: string): Promise<void> {
    this.repository.delete(userID);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({
      where: [
        {
          email,
        },
      ],
    });
  }

  async findById(user_id: string): Promise<User> {
    return this.repository.findOne({
      where: [
        {
          id: user_id,
        },
      ],
    });
  }
}
