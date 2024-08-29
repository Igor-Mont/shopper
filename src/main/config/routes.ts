import { Express, Router } from 'express';

import measurementByImageRoutes from '../routes/measurement-by-image-routes';
export default (app: Express): void => {
  const router = Router();
  app.use(router);
  measurementByImageRoutes(router);
};
