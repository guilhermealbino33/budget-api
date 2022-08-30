import { User } from "../../../entities/User";
import { IAuthenticateUserResponseDTO } from "../dtos/IAuthenticateUserResponseDTO";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IRequest {
  email: string;
  password: string;
}

export default interface IUsersService {
  createUser({ name, email, password }: ICreateUserDTO): Promise<User>;
  findById(userId: string): Promise<User | undefined>;
  findByEmail(userId: string): Promise<User | undefined>;
  authenticateUser({
    email,
    password,
  }: IRequest): Promise<IAuthenticateUserResponseDTO>;
}
