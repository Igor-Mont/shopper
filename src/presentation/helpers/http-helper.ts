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

export const conflictError = ({ message }: Error, error_code = 'DOUBLE_REPORT'): HttpResponseError => {
  return {
    error_code,
    error_description: message,
  };
};

export const notFoundError = ({ message }: Error): HttpResponseError => {
  return {
    error_code: 'MEASURE_NOT_FOUND',
    error_description: message,
  };
};
