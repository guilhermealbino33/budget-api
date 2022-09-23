import { Router } from 'express';
import {
  createBudgetHandler,
  deleteBudgetHandler,
  showBudgetHandler,
  // updateBudgetHandler,
} from '../modules/budgets/controllers/budget.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const budgetsRouter = Router();
budgetsRouter.post('/', auth, createBudgetHandler);
// budgetsRouter.patch('/:id', auth, updateBudgetHandler);
budgetsRouter.delete('/:id', auth, ensureAdmin, deleteBudgetHandler);
budgetsRouter.get('/:id?', auth, showBudgetHandler);

export { budgetsRouter };
