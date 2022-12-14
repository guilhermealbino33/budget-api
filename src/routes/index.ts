import { Router } from 'express';
import { additionalItemsRouter } from './additionalItems.routes';
import { budgetsRouter } from './budgets.routes';
import { categoriesRouter } from './categories.routes';
import { citiesRouter } from './cities.routes';
import { customersRouter } from './customers.routes';
import { productsRouter } from './products.routes';
import { salesmenRouter } from './salesmen.routes';
import { sessionsRouter } from './sessions.routes';
import { statesRouter } from './states.routes';

import { usersRouter } from './users.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/api/products', productsRouter);
router.use('/api/categories', categoriesRouter);
router.use('/api/customers', customersRouter);
router.use('/api/salesmen', salesmenRouter);
router.use('/api/budgets', budgetsRouter);
router.use('/api/additional-items', additionalItemsRouter);
router.use('/api/cities', citiesRouter);
router.use('/api/states', statesRouter);

export { router };
