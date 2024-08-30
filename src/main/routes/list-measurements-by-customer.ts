import { Router } from 'express';

import { adaptRoute } from '../adapters/express-route-adapter';
import { makeListMeasurementsByCustomerController } from '../factories/list-measurements-by-customer';

export default (router: Router): void => {
  router.get('/:customer_code/list', adaptRoute(makeListMeasurementsByCustomerController()));
};
