import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSalesmanUseCase from '../useCases/createSalesman.useCase';
import DeleteSalesmanUseCase from '../useCases/deleteSalesman.useCase';
import ShowSalesmanUseCase from '../useCases/showSalesman.useCase';
import UpdateSalesmanUseCase from '../useCases/updateSalesman.useCase';

export async function createSalesmanHandler(
  request: Request,
  response: Response
) {
  const {
    name,
    email,
    cpf,
    cnpj,
    ie,
    city_code,
    state,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    birthday,
  } = request.body;
  const createSalesmanUseCase = container.resolve(CreateSalesmanUseCase);
  const salesman = await createSalesmanUseCase.execute({
    name,
    email,
    cpf,
    cnpj,
    ie,
    city_code,
    state,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    birthday,
  });

  return response.status(201).json(salesman);
}

export async function updateSalesmanHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const {
    name,
    email,
    cpf,
    cnpj,
    ie,
    city_code,
    state,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    birthday,
  } = request.body;

  const updateSalesmanUseCase = container.resolve(UpdateSalesmanUseCase);
  const salesman = await updateSalesmanUseCase.execute(id, {
    name,
    email,
    cpf,
    cnpj,
    ie,
    city_code,
    state,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    birthday,
  });

  return response.status(200).json(salesman);
}

export async function deleteSalesmanHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const deleteSalesmanUseCase = container.resolve(DeleteSalesmanUseCase);
  await deleteSalesmanUseCase.execute(id);

  return response.status(204);
}

export async function showSalesmanHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const showSalesmanUseCase = container.resolve(ShowSalesmanUseCase);
  const salesman = await showSalesmanUseCase.execute(id);

  return response.status(200).json(salesman);
}
