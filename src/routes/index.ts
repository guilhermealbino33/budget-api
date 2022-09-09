import { Router } from 'express';
import { additionalItemsRouter } from './additionalItems.routes';
import { budgetsRouter } from './budgets.routes';
import { customersRouter } from './customers.routes';
import { productsRouter } from './products.routes';
import { salesmanRouter } from './salesman.routes';
import { sessionsRouter } from './sessions.routes';

import { usersRouter } from './users.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/api/products', productsRouter);
router.use('/api/customers', customersRouter);
router.use('/api/salesman', salesmanRouter);
router.use('/api/budgets', budgetsRouter);
router.use('/api/additional-items', additionalItemsRouter);

export { router };
