import { Router } from 'express';
import { productsRouter } from './products.routes';
import { sessionsRouter } from './sessions.routes';

import { usersRouter } from './users.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/sessions', sessionsRouter);
router.use('/api/products', productsRouter);

export { router };
