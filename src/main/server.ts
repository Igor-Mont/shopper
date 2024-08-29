import express, { NextFunction, Request, Response } from 'express';

import { mongoHelper } from '../infra/db/mongodb/helpers/mongo-helper';
import env from './config/env';
import setupRoutes from './config/routes';

const app = express();

const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('Access-control-allow-origin', '*');
  res.set('Access-control-allow-methods', '*');
  res.set('Access-control-allow-headers', '*');
  return next();
};

const contentType = (req: Request, res: Response, next: NextFunction): void => {
  res.type('json');
  return next();
};

app.use(express.json());
app.use(cors);
app.use(contentType);

setupRoutes(app);

mongoHelper
  .connect(env.mongoUrl)
  .then(() => {
    const port = env.port;
    //eslint-disable-next-line
    app.listen(port, () => console.log(`Server is running on port ${port} 🔥`));
  })
  .catch(console.error);
