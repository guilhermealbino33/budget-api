import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../shared/config/upload';

import {
  createProductHandler,
  deleteProductHandler,
  deleteProductImageHandler,
  showProductHandler,
  updateProductHandler,
  uploadProductImageHandler,
} from '../modules/products/controllers/product.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.post('/', auth, createProductHandler);
productsRouter.get('/:id?', auth, showProductHandler);
productsRouter.patch('/:id', auth, updateProductHandler);
productsRouter.delete('/:id', auth, ensureAdmin, deleteProductHandler);

productsRouter.post(
  '/images/:id',
  auth,
  upload.array('images'),
  uploadProductImageHandler
);
productsRouter.delete('/images/:id', auth, deleteProductImageHandler);

export { productsRouter };
