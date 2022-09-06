import { Router } from 'express';
import {
  createSessionHandler,
  refreshTokenHandler,
} from '../modules/users/controllers/session.controller';

const sessionsRouter = Router();

sessionsRouter.post('/', createSessionHandler);
sessionsRouter.post('/refresh-token', refreshTokenHandler);

export { sessionsRouter };
