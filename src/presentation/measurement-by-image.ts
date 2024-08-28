import { InvalidParamError, MissingParamError } from './errors';
import { invalidDataRequest, serverError } from './helpers/http-helper';
import { Base64Validator, Controller, HttpRequest, HttpResponse } from './protocols';

export class MeasurementByImageController implements Controller {
  constructor(private readonly base64Validator: Base64Validator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['image', 'customer_code', 'measure_datetime', 'measure_type'];

      const { body: requestBody } = httpRequest;
      for (const field of requiredFields) {
        if (!requestBody[field]) {
          return invalidDataRequest(new MissingParamError(field));
        }
      }

      const isBase64Valid = this.base64Validator.isValid(requestBody.image);
      if (!isBase64Valid) return invalidDataRequest(new InvalidParamError('image'));
    } catch (error) {
      return serverError();
    }
  }
}
