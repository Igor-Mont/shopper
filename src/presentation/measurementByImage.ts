import { MissingParamError } from './errors/missing-param-error';
import { invalidDataRequest } from './helpers/http-helper';
import { HttpRequest, HttpResponse } from './protocols/http';

export class MeasurementByImageController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.image) {
      return invalidDataRequest(new MissingParamError('image'));
    }

    if (!httpRequest.body.customer_code) {
      return invalidDataRequest(new MissingParamError('customer_code'));
    }

    if (!httpRequest.body.measure_datetime) {
      return invalidDataRequest(new MissingParamError('measure_datetime'));
    }

    if (!httpRequest.body.measure_type) {
      return invalidDataRequest(new MissingParamError('measure_type'));
    }
  }
}
