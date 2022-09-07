import { Router } from 'express';
import {
  createProductHandler,
  deleteProductHandler,
  showProductHandler,
  updateProductHandler,
} from '../modules/products/controllers/product.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const productsRouter = Router();
productsRouter.post('/', auth, createProductHandler);
productsRouter.patch('/:id', auth, updateProductHandler);
productsRouter.delete('/:id', auth, ensureAdmin, deleteProductHandler);
productsRouter.get('/:id', auth, showProductHandler);

export { productsRouter };
