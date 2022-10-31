import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateSalesmanUseCase from '../useCases/createSalesman.useCase';
import DeleteSalesmanUseCase from '../useCases/deleteSalesman.useCase';
import ShowSalesmenUseCase from '../useCases/showSalesmen.useCase';
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
    state_code,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    account_type,
    district,
    complement,
  } = request.body;
  const createSalesmanUseCase = container.resolve(CreateSalesmanUseCase);
  const salesman = await createSalesmanUseCase.execute({
    name,
    email,
    cpf,
    cnpj,
    ie,
    city_code,
    state_code,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    account_type,
    district,
    complement,
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
    state_code,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    account_type,
    district,
    complement,
  } = request.body;

  const updateSalesmanUseCase = container.resolve(UpdateSalesmanUseCase);
  const salesman = await updateSalesmanUseCase.execute(id, {
    name,
    email,
    cpf,
    cnpj,
    ie,
    city_code,
    state_code,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    account_type,
    district,
    complement,
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

  return response.status(204).send();
}

export async function showSalesmenHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const page = request.query.page as string;
  const limit = request.query.limit as string;

  const showSalesmenUseCase = container.resolve(ShowSalesmenUseCase);
  const customers = await showSalesmenUseCase.execute(
    page ? parseInt(page, 10) : 1,
    limit ? parseInt(limit, 10) : 5,
    id
  );

  return response.status(200).json(customers);
}
