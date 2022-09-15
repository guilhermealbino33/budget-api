import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/errors/AppError';
import { IStorageProvider } from '../../../shared/providers/StorageProvider/IStorageProvider';
import { IProductsImagesRepository } from '../repositories/IProductsImagesRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
export default class UploadProductImageUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ProductsImagesRepository')
    private productsImagesRepository: IProductsImagesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute(id: string, imagesName: string[]) {
    if (!id) {
      throw new AppError('Product id must be informed!', 400);
    }

    console.log(id, imagesName);
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    imagesName.map(async (image) => {
      await this.productsImagesRepository.create(id, image);
      await this.storageProvider.save(image, 'products');
    });
  }
}
