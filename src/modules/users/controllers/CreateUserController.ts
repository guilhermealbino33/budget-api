import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "../useCases/createUser/CreateUserUseCase";

export class CreateUserController {
  // DEVERÁ CHAMAR A ROTA DE CREATE USER

  async execute(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserUseCase);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}
