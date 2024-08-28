import { HttpRequest, HttpResponse, HttpResponseError } from './protocols/http';

export class MeasurementByImageController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.image) {
      const httpResponse: HttpResponseError = {
        error_code: 'INVALID_DATA',
        error_description: new Error('Missing param: image'),
      };
      return httpResponse;
    }

    if (!httpRequest.body.customer_code) {
      const httpResponse: HttpResponseError = {
        error_code: 'INVALID_DATA',
        error_description: new Error('Missing param: customer_code'),
      };
      return httpResponse;
    }

    if (!httpRequest.body.measure_datetime) {
      const httpResponse: HttpResponseError = {
        error_code: 'INVALID_DATA',
        error_description: new Error('Missing param: measure_datetime'),
      };
      return httpResponse;
    }

    if (!httpRequest.body.measure_type) {
      const httpResponse: HttpResponseError = {
        error_code: 'INVALID_DATA',
        error_description: new Error('Missing param: measure_type'),
      };
      return httpResponse;
    }
  }
}
