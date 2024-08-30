import { Router } from 'express';

import { adaptRoute } from '../adapters/express-route-adapter';
import { makeViewMeasurementController } from '../factories/view-measurement';

export default (router: Router): void => {
  router.get('/view-measurement/:customer_code/:measure_uuid', adaptRoute(makeViewMeasurementController()));
};
