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

  async update(id: string, data: IUser): Promise<void> {
    this.repository
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();
  }

  async delete(userID: string): Promise<void> {
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

  async list(): Promise<User[]> {
    return this.repository.find();
  }
}
