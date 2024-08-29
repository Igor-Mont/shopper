import { Router } from 'express';

export default (router: Router): void => {
  router.post('/upload', (req, res) => {
    return res.send({ teste: 'asd' });
  });
};
