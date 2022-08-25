import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

export class CreateUserController {
  // CONFERIR O TIPO DE RETORNO

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
