import { Router } from 'express';
import {
  createAdditionalItemsHandler,
  deleteAdditionalItemsHandler,
  showAdditionalItemsHandler,
  updateAdditionalItemsHandler,
} from '../modules/additionalItems/controllers/additionalItem.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const additionalItemsRouter = Router();
additionalItemsRouter.post('/', auth, createAdditionalItemsHandler);
additionalItemsRouter.patch('/:id', auth, updateAdditionalItemsHandler);
additionalItemsRouter.delete(
  '/:id',
  auth,
  ensureAdmin,
  deleteAdditionalItemsHandler
);
additionalItemsRouter.get('/:id?', auth, showAdditionalItemsHandler);

export { additionalItemsRouter };
