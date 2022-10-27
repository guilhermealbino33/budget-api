import { Repository } from 'typeorm';
import { AppDataSource } from '../../../../data-source';
import { IUserToken, UserTokens } from '../../../../entities/userTokens';
import { IUsersTokensRepository } from '../IUsersTokensRepository';

export class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserTokens);
  }

  async create(token: IUserToken): Promise<IUserToken> {
    const userToken = this.repository.create(token);
    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserId(user_id: string): Promise<IUserToken[]> {
    return this.repository.find({ where: [{ user_id }] });
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<IUserToken> {
    const usersTokens = await this.repository.findOne({
      where: [
        {
          refresh_token,
          user_id,
        },
      ],
    });

    return usersTokens;
  }

  async findByRefreshToken(refresh_token: string): Promise<IUserToken> {
    const usersToken = await this.repository.findOne({
      where: [
        {
          refresh_token,
        },
      ],
    });

    return usersToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
