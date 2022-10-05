import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductUseCase from '../useCases/createProduct.useCase';
import DeleteProductUseCase from '../useCases/deleteProduct.useCase';
import DeleteProductImageUseCase from '../useCases/deleteProductImage.useCase';
import ShowProductUseCase from '../useCases/showProduct.useCase';
import UpdateProductUseCase from '../useCases/updateProduct.useCase';
import UploadProductImageUseCase from '../useCases/uploadProductImage.useCase';

interface IFiles {
  filename: string;
}

export async function createProductHandler(
  request: Request,
  response: Response
) {
  const { name, category_id, code, size, description } = request.body;

  const createProductUseCase = container.resolve(CreateProductUseCase);
  const product = await createProductUseCase.execute({
    name,
    category_id,
    code,
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

  const { name, code, category_id, size, description } = request.body;

  const updateProductUseCase = container.resolve(UpdateProductUseCase);
  const product = await updateProductUseCase.execute(id, {
    name,
    code,
    category_id,
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

export async function uploadProductImageHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;
  const imgs = request.files as IFiles[];

  const uploadProductImageUseCase = container.resolve(
    UploadProductImageUseCase
  );

  const imagesNames = imgs.map((file) => file.filename);

  await uploadProductImageUseCase.execute(id, imagesNames);

  return response.status(200).send();
}

export async function deleteProductImageHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const deleteProductImageUseCase = container.resolve(
    DeleteProductImageUseCase
  );

  await deleteProductImageUseCase.execute(id);

  return response.status(200).send();
}
