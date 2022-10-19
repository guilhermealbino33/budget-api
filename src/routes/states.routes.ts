import { Router } from 'express';
import { listStatesHandler } from '../modules/address/controllers/state.controller';

import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const statesRouter = Router();
statesRouter.get('/:id?', auth, listStatesHandler);

export { statesRouter };
