import { Router } from 'express';
import {
  listCitiesByStateCodeHandler,
  listCitiesHandler,
} from '../modules/address/controllers/city.controller';

import { ensureAuthenticated as auth } from '../shared/middlewares/ensureAuthenticated';

const citiesRouter = Router();
citiesRouter.get('/by-state/:state_code', auth, listCitiesByStateCodeHandler);
citiesRouter.get('/:code?', auth, listCitiesHandler);

export { citiesRouter };
