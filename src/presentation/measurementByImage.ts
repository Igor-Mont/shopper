import { MissingParamError } from './errors/missing-param-error';
import { invalidDataRequest } from './helpers/http-helper';
import { HttpRequest, HttpResponse } from './protocols/http';

export class MeasurementByImageController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['image', 'customer_code', 'measure_datetime', 'measure_type'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return invalidDataRequest(new MissingParamError(field));
      }
    }
  }
}
