import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../shared/config/upload';

import {
  createProductHandler,
  deleteProductHandler,
  deleteProductImageHandler,
  listProductsHandler,
  showProductHandler,
  updateProductHandler,
  uploadProductImageHandler,
} from '../modules/products/controllers/product.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.post('/', auth, createProductHandler);
productsRouter.patch('/:id', auth, updateProductHandler);
productsRouter.delete('/:id', auth, ensureAdmin, deleteProductHandler);
productsRouter.get('/:id', auth, showProductHandler);
productsRouter.get('/', auth, listProductsHandler);

productsRouter.post(
  '/images/:id',
  auth,
  upload.array('images'),
  uploadProductImageHandler
);
productsRouter.delete('/images/:id', auth, deleteProductImageHandler);

export { productsRouter };
