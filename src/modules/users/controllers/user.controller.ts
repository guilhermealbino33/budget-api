import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";

import { ProfileMap } from "../mappers/ProfileMap";
import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";
import { ShowUserProfileUseCase } from "../useCases/ShowUserProfileUseCase";

export class UserController {
  // CONFERIR O TIPO DE RETORNO

  async CreateUserHandler(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserUseCase);
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }

  async ShowUserProfileHandler(request: Request, response: Response) {
    const { id } = request.user;
    const showUserProfile = container.resolve(ShowUserProfileUseCase);
    const user = await showUserProfile.execute(id);
    const profileDTO = ProfileMap.toDTO(user);

    return response.json(profileDTO);
  }

  async AuthenticateUserHandler(request: Request, response: Response) {
    try {
      const { email, password } = request.body;
      const authenticateUser = container.resolve(AuthenticateUserUseCase);
      const { user, token } = await authenticateUser.execute(email, password);

      return response.json({ user, token });
    } catch (error) {
      console.log(error);
      return response
        .status(401)
        .json(new AppError("Incorrect e-mail or password", 401));
    }
  }
}
