import { HttpResponseError } from '../protocols/http';

export const invalidDataRequest = (error: Error): HttpResponseError => {
  return {
    error_code: 'INVALID_DATA',
    error_description: error,
  };
};
