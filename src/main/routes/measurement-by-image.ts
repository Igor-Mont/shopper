import { Router } from 'express';

import { adaptRoute } from '../adapters/express-route-adapter';
import { makeMeasurementByImageController } from '../factories/measurement-by-image';

export default (router: Router): void => {
  router.post('/upload', adaptRoute(makeMeasurementByImageController()));
};
