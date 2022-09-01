import { UserTokens } from '../../../entities/UserTokens';
import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens | undefined>;
  findByRefreshToken(refresh_token: string): Promise<UserTokens | undefined>;
  deleteById(id: string): Promise<void>;
}

export { IUsersTokensRepository };
