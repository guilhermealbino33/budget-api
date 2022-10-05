import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IStorageProvider } from '../../../shared/providers/StorageProvider/IStorageProvider';
import { IProductsImagesRepository } from '../repositories/IProductsImagesRepository';

@injectable()
export default class DeleteProductImageUseCase {
  constructor(
    @inject('ProductsImagesRepository')
    private productsImagesRepository: IProductsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string) {
    if (!id) {
      throw new AppError('Product image id must be informed!', 400);
    }

    const productImage = await this.productsImagesRepository.findById(id);

    if (!productImage) {
      throw new AppError('Product image not found!', 404);
    }

    await this.productsImagesRepository.delete(id);
    await this.storageProvider.delete(productImage.file_name, 'products');
  }
}
