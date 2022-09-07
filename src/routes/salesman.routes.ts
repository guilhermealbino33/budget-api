import { Router } from 'express';
import {
  createSalesmanHandler,
  deleteSalesmanHandler,
  showSalesmanHandler,
  updateSalesmanHandler,
} from '../modules/salesman/controllers/salesman.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const salesmanRouter = Router();
salesmanRouter.post('/', auth, createSalesmanHandler);
salesmanRouter.patch('/:id', auth, updateSalesmanHandler);
salesmanRouter.delete('/:id', auth, ensureAdmin, deleteSalesmanHandler);
salesmanRouter.get('/:id', auth, showSalesmanHandler);

export { salesmanRouter };
