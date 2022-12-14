import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CountCustomersUseCase from '../useCases/countCustomers.useCase';
import CreateCustomerUseCase from '../useCases/createCustomer.useCase';
import DeleteCustomerUseCase from '../useCases/deleteCustomers.useCase';
import ShowCustomersUseCase from '../useCases/showCustomers.useCase';
import UpdateCustomerUseCase from '../useCases/updateCustomer.useCase';

export async function createCustomerHandler(
  request: Request,
  response: Response
) {
  const {
    name,
    email,
    cpf,
    cnpj,
    ie,
    requester,
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
  const createCustomerUseCase = container.resolve(CreateCustomerUseCase);
  const customer = await createCustomerUseCase.execute({
    name,
    email,
    cpf,
    cnpj,
    ie,
    requester,
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

  return response.sendStatus(201).json(customer);
}

export async function updateCustomerHandler(
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
    requester,
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

  const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);
  const customer = await updateCustomerUseCase.execute(id, {
    name,
    email,
    cpf,
    cnpj,
    ie,
    requester,
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

  return response.status(200).json(customer);
}

export async function deleteCustomerHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase);
  await deleteCustomerUseCase.execute(id);

  return response.status(204).send();
}

export async function showCustomersHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const name = request.query.name as string;
  const page = request.query.page as string;
  const limit = request.query.limit as string;

  const showCustomersUseCase = container.resolve(ShowCustomersUseCase);
  const customers = await showCustomersUseCase.execute(
    page ? parseInt(page, 10) : 1,
    limit ? parseInt(limit, 10) : 5,
    id,
    name
  );

  return response.status(200).json(customers);
}

export async function countCustomersHandler(
  request: Request,
  response: Response
) {
  const countCustomersUseCase = container.resolve(CountCustomersUseCase);
  const customersCount = await countCustomersUseCase.execute();

  return response.status(200).json(customersCount);
}
