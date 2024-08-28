import { ServerError } from '../errors/server-error';
import { HttpResponseError } from '../protocols/http';

export const invalidDataRequest = (error: Error): HttpResponseError => {
  return {
    error_code: 'INVALID_DATA',
    error_description: error,
  };
};

export const serverError = (): HttpResponseError => {
  return {
    error_code: 'SERVER_ERROR',
    error_description: new ServerError(),
  };
};
