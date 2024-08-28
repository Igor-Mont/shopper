import { InvalidParamError } from './errors/invalid-param-error';
import { MissingParamError } from './errors/missing-param-error';
import { invalidDataRequest } from './helpers/http-helper';
import { Base64Validator } from './protocols/base64-validor';
import { Controller } from './protocols/controller';
import { HttpRequest, HttpResponse } from './protocols/http';

export class MeasurementByImageController implements Controller {
  constructor(private readonly base64Validator: Base64Validator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['image', 'customer_code', 'measure_datetime', 'measure_type'];

    const { body: requestBody } = httpRequest;
    for (const field of requiredFields) {
      if (!requestBody[field]) {
        return invalidDataRequest(new MissingParamError(field));
      }
    }

    const isBase64Valid = this.base64Validator.isValid(requestBody.image);

    if (!isBase64Valid) return invalidDataRequest(new InvalidParamError('image'));
  }
}
