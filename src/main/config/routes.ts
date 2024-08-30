import { Express, Router } from 'express';

import confirmMeasurementRoutes from '../routes/confirm-measurement';
import listMeasurementsByCustomerRoutes from '../routes/list-measurements-by-customer';
import measurementByImageRoutes from '../routes/measurement-by-image';
import viewMesaurementRoutes from '../routes/view-measurement';

export default (app: Express): void => {
  const router = Router();
  app.use(router);
  measurementByImageRoutes(router);
  confirmMeasurementRoutes(router);
  listMeasurementsByCustomerRoutes(router);
  viewMesaurementRoutes(router);
};
