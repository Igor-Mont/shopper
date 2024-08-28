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
  }
}
