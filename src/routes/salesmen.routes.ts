import { Router } from 'express';
import {
  createSalesmanHandler,
  deleteSalesmanHandler,
  showSalesmenHandler,
  updateSalesmanHandler,
} from '../modules/salesmen/controllers/salesman.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const salesmenRouter = Router();
salesmenRouter.post('/', auth, createSalesmanHandler);
salesmenRouter.patch('/:id', auth, updateSalesmanHandler);
salesmenRouter.delete('/:id', auth, ensureAdmin, deleteSalesmanHandler);
salesmenRouter.get('/:id?', auth, showSalesmenHandler);

export { salesmenRouter };
