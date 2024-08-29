import { Request, Response } from 'express';

import { Controller, HttpRequest } from '../../presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  return async ({ body }: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body,
    };

    const response = await controller.handle(httpRequest);

    const mapErrorCode = {
      INVALID_DATA: 400,
      SERVER_ERROR: 500,
    };

    if (response.error_code) return res.status(mapErrorCode[response.error_code]).json(response);

    return response;
  };
};
