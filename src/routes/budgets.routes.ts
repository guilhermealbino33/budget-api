import { Router } from 'express';
import {
  openCloseBudgetHandler,
  createBudgetHandler,
  deleteBudgetHandler,
  showBudgetHandler,
  updateBudgetHandler,
  countBudgetsHandler,
  countSalesBudgetsHandler,
} from '../modules/budgets/controllers/budget.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const budgetsRouter = Router();
budgetsRouter.post('/', auth, createBudgetHandler);
budgetsRouter.patch('/:id', auth, updateBudgetHandler);
budgetsRouter.patch('/open-close/:id', auth, openCloseBudgetHandler);
budgetsRouter.delete('/:id', auth, ensureAdmin, deleteBudgetHandler);
budgetsRouter.get('/count', auth, countBudgetsHandler);
budgetsRouter.get('/count-sales', auth, countSalesBudgetsHandler);
budgetsRouter.get('/:id?', auth, showBudgetHandler);

export { budgetsRouter };
