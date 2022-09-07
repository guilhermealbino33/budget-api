import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductUseCase from '../useCases/createProduct.useCase';
import DeleteProductUseCase from '../useCases/deleteProduct.useCase';
import ShowProductUseCase from '../useCases/showProduct.useCase';
import UpdateProductUseCase from '../useCases/updateProduct.useCase';

export async function createProductHandler(
  request: Request,
  response: Response
) {
  const { name, category, sku, value, size, description } = request.body;
  const createProductUseCase = container.resolve(CreateProductUseCase);
  const product = await createProductUseCase.execute({
    name,
    category,
    sku,
    value,
    size,
    description,
  });

  return response.status(201).json(product);
}

export async function updateProductHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const { name, category, value, size, description } = request.body;

  const updateProductUseCase = container.resolve(UpdateProductUseCase);
  const product = await updateProductUseCase.execute(id, {
    name,
    category,
    value,
    size,
    description,
  });

  return response.status(200).json(product);
}

export async function deleteProductHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const deleteProductUseCase = container.resolve(DeleteProductUseCase);
  await deleteProductUseCase.execute(id);

  return response.status(204);
}

export async function showProductHandler(request: Request, response: Response) {
  const { id } = request.params;
  const showProductUseCase = container.resolve(ShowProductUseCase);
  const product = await showProductUseCase.execute(id);

  return response.status(200).json(product);
}
