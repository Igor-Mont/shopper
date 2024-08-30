import { Router } from 'express';

import { adaptRoute } from '../adapters/express-route-adapter';
import { makeConfirmMeasurementController } from '../factories/confirm-measurement';

export default (router: Router): void => {
  router.patch('/confirm', adaptRoute(makeConfirmMeasurementController()));
};
