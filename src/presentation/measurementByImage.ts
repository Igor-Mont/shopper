export class MeasurementByImageController {
  handle(httpRequest: any): any {
    return {
      error_code: 400,
      error_description: new Error('Missing param: image'),
    };
  }
}
