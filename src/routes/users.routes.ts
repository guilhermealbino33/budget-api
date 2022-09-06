import { Router } from 'express';
import {
  createUserHandler,
  deleteUserHandler,
  showUserHandler,
  updateUserHandler,
} from '../modules/users/controllers/user.controller';

import { ensureAdmin } from '../shared/middlewares/ensureAdmin';
import { ensureAuthenticated } from '../shared/middlewares/ensureAuthenticated';

const usersRouter = Router();
usersRouter.post('/', createUserHandler);
usersRouter.patch('/:id', updateUserHandler);
usersRouter.delete('/:id', ensureAuthenticated, ensureAdmin, deleteUserHandler);
usersRouter.get('/:id', showUserHandler);

export { usersRouter };
