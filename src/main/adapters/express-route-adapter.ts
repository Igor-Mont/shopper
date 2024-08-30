import { Request, Response } from 'express';

import { Controller, HttpRequest } from '../../presentation/protocols';

export const adaptRoute = (controller: Controller) => {
  return async ({ body, params, query }: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body,
      params,
      query,
    };

    const response = await controller.handle(httpRequest);

    const mapErrorCode = {
      INVALID_DATA: 400,
      SERVER_ERROR: 500,
      DOUBLE_REPORT: 409,
      MEASURE_NOT_FOUND: 404,
      MEASURES_NOT_FOUND: 404,
      CONFIRMATION_DUPLICATE: 409,
    };

    if (response.error_code) return res.status(mapErrorCode[response.error_code]).json(response);

    return res.status(200).json(response);
  };
};
