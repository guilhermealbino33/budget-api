import { Router } from 'express';
import {
  openCloseBudgetHandler,
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
budgetsRouter.patch('/:id', auth, openCloseBudgetHandler);
budgetsRouter.delete('/:id', auth, ensureAdmin, deleteBudgetHandler);
budgetsRouter.get('/:id?', auth, showBudgetHandler);

export { budgetsRouter };
