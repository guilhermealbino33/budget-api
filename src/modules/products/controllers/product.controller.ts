import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CountProductsUseCase from '../useCases/countProducts.useCase';
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
  const {
    name,
    category_id,
    code,
    installation_area,
    list_price,
    description,
  } = request.body;

  const createProductUseCase = container.resolve(CreateProductUseCase);
  const product = await createProductUseCase.execute({
    name,
    category_id,
    code,
    installation_area,
    list_price,
    description,
  });

  return response.status(201).json(product);
}

export async function updateProductHandler(
  request: Request,
  response: Response
) {
  const { id } = request.params;

  const {
    name,
    code,
    installation_area,
    list_price,
    category_id,
    description,
  } = request.body;

  const updateProductUseCase = container.resolve(UpdateProductUseCase);
  const product = await updateProductUseCase.execute(id, {
    name,
    code,
    installation_area,
    list_price,
    category_id,
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

  return response.status(204).send();
}

export async function showProductHandler(request: Request, response: Response) {
  const { id } = request.params;
  const name = request.query.name as string;
  const page = request.query.page as string;
  const limit = request.query.limit as string;

  const showProductUseCase = container.resolve(ShowProductUseCase);
  const product = await showProductUseCase.execute(
    page ? parseInt(page, 10) : 1,
    limit ? parseInt(limit, 10) : 5,
    id,
    name
  );

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

  return response.status(204).send();
}

export async function countProductHandler(
  request: Request,
  response: Response
) {
  const countProductsUseCase = container.resolve(CountProductsUseCase);
  const productsCount = await countProductsUseCase.execute();

  return response.status(200).json(productsCount);
}
