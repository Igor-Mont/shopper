import { Express, Router } from 'express';

import confirmMeasurementRoutes from '../routes/confirm-measurement';
import measurementByImageRoutes from '../routes/measurement-by-image-routes';

export default (app: Express): void => {
  const router = Router();
  app.use(router);
  measurementByImageRoutes(router);
  confirmMeasurementRoutes(router);
};
