import { Router } from 'express';
import { ensureAuthenticated } from '../shared/infra/http/middlewares/ensureAuthenticated';
import {
  createUserHandler,
  authenticateUserHandler,
  showUserProfileHandler,
} from '../controllers/user.controller';

const usersRouter = Router();

usersRouter.post('/create', createUserHandler);
usersRouter.post('/sessions', authenticateUserHandler);
usersRouter.get('/profile', showUserProfileHandler);

export { usersRouter };
