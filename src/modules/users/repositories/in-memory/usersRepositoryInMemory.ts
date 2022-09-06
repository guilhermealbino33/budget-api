import { IUser, User } from '../../../../entities/user';
import { IUsersRepository } from '../IUsersRepository';

export default class UsersRepositoryInMemory implements IUsersRepository {
  users: User[];

  constructor() {
    this.users = [];
  }

  async create(user: IUser): Promise<void> {
    const userToCreate = new User();

    userToCreate.name = user.name;
    userToCreate.email = user.email;
    userToCreate.password = user.password;

    this.users.push(userToCreate);
  }

  async updateUser(user: IUser): Promise<void> {
    // TODO
    throw new Error('Method not implemented.');
  }

  async deleteUser(userID: string): Promise<void> {
    // TODO
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email) as User;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id) as User;
  }
}
