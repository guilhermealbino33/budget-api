import { Router } from 'express';
import {
  countCustomersHandler,
  createCustomerHandler,
  deleteCustomerHandler,
  showCustomersHandler,
  updateCustomerHandler,
} from '../modules/customers/controllers/customer.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const customersRouter = Router();
customersRouter.post('/', auth, createCustomerHandler);
customersRouter.patch('/:id', auth, updateCustomerHandler);
customersRouter.delete('/:id', auth, ensureAdmin, deleteCustomerHandler);
customersRouter.get('/count', auth, countCustomersHandler);
customersRouter.get('/:id?', auth, showCustomersHandler);

export { customersRouter };
