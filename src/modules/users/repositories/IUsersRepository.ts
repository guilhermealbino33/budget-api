import { IUser, User } from '../../../entities/user';

export interface IUsersRepository {
  create(user: IUser): Promise<void>;
  update(id: string, data: IUser): Promise<void>;
  deleteUser(userID: string): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(user_id: string): Promise<User>;
}
