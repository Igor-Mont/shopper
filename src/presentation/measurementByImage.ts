export class MeasurementByImageController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.image) {
      return {
        error_code: 400,
        error_description: new Error('Missing param: image'),
      };
    }

    if (!httpRequest.body.customer_code) {
      return {
        error_code: 400,
        error_description: new Error('Missing param: customer_code'),
      };
    }

    if (!httpRequest.body.measure_datetime) {
      return {
        error_code: 400,
        error_description: new Error('Missing param: measure_datetime'),
      };
    }

    if (!httpRequest.body.measure_type) {
      return {
        error_code: 400,
        error_description: new Error('Missing param: measure_type'),
      };
    }
  }
}
