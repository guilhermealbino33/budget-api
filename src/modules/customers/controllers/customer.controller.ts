import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerUseCase from '../useCases/createCustomer.useCase';
import DeleteCustomerUseCase from '../useCases/deleteCustomer.useCase';
import ShowCustomerUseCase from '../useCases/showCustomer.useCase';
import UpdateCustomerUseCase from '../useCases/updateCustomer.useCase';

export async function createCustomerHandler(
  request: Request,
  response: Response
) {
  try {
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
    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);
    const customer = await createCustomerUseCase.execute({
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

    return response.sendStatus(201).json(customer);
  } catch (error) {
    console.log(error);

    return 'error';
  }
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
    city_code,
    state,
    address,
    address_number,
    cep,
    phone_number_1,
    phone_number_2,
    birthday,
  } = request.body;

  const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);
  const customer = await updateCustomerUseCase.execute(id, {
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

  return response.status(200).json(customer);
}

export async function deleteCustomerHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const deleteCustomerUseCase = container.resolve(DeleteCustomerUseCase);
  await deleteCustomerUseCase.execute(id);

  return response.status(204);
}

export async function showCustomerHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const showCustomerUseCase = container.resolve(ShowCustomerUseCase);
  const customer = await showCustomerUseCase.execute(id);

  return response.status(200).json(customer);
}
