import { Router } from 'express';
import { sessionsRouter } from './sessions.routes';

import { usersRouter } from './users.routes';

const router = Router();

router.use('/api/users', usersRouter);
router.use('/api/sessions', sessionsRouter);

export { router };
