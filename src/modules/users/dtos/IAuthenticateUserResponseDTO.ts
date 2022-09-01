import { User } from '../../../entities/user';

export interface IAuthenticateUserResponseDTO {
  token: string;
  user: Pick<User, 'id' | 'name' | 'email'>;
}
