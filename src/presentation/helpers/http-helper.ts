import { MissingParamError } from '../errors/missing-param-error';
import { HttpResponseError } from '../protocols/http';

export const invalidDataRequest = (missingParamError: MissingParamError): HttpResponseError => {
  return {
    error_code: 'INVALID_DATA',
    error_description: missingParamError,
  };
};
