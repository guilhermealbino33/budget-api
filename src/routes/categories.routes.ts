import { Router } from 'express';
import {
  createCategoryHandler,
  deleteCategoryHandler,
  showCategoriesHandler,
  updateCategoryHandler,
} from '../modules/categories/controllers/category.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const categoriesRouter = Router();
categoriesRouter.post('/', auth, createCategoryHandler);
categoriesRouter.patch('/:id', auth, updateCategoryHandler);
categoriesRouter.delete('/:id', auth, ensureAdmin, deleteCategoryHandler);
categoriesRouter.get('/', auth, showCategoriesHandler);

export { categoriesRouter };
