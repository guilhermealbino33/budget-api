import { IUserToken } from '../../../entities/userTokens';

export interface IUsersTokensRepository {
  create(token: IUserToken): Promise<IUserToken>;
  findByUserId(user_id: string): Promise<IUserToken[]>;
  findByRefreshToken(refresh_token: string): Promise<IUserToken>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<IUserToken>;
  deleteById(id: string): Promise<void>;
}
