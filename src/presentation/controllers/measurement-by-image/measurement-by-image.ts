import { InvalidParamError, MissingParamError } from '../../errors';
import { invalidDataRequest, serverError } from '../../helpers/http-helper';
import {
  Base64Validator,
  Controller,
  HttpRequest,
  HttpResponse,
  AddMeasureByImage,
} from './measurement-by-image-protocols';

export class MeasurementByImageController implements Controller {
  constructor(
    private readonly base64Validator: Base64Validator,
    private readonly addMeasureByImage: AddMeasureByImage,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['image', 'customer_code', 'measure_datetime', 'measure_type'];

      const { body: requestBody } = httpRequest;
      for (const field of requiredFields) {
        if (!requestBody[field]) {
          return invalidDataRequest(new MissingParamError(field));
        }
      }

      const { image, customer_code, measure_datetime, measure_type } = requestBody;
      const isBase64Valid = this.base64Validator.isValid(requestBody.image);
      if (!isBase64Valid) return invalidDataRequest(new InvalidParamError('image'));

      const measureByImage = await this.addMeasureByImage.add({ image, customer_code, measure_datetime, measure_type });
      return measureByImage;
    } catch (error) {
      return serverError();
    }
  }
}
