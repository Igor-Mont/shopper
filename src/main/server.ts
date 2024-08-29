import express, { NextFunction, Request, Response } from 'express';

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

//eslint-disable-next-line
app.listen(8080, () => console.log('Server is running on port 8080 🔥'));
