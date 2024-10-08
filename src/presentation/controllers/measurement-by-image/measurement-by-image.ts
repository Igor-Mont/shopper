import { MeasureType } from '../../../domain/models/measure-type';
import { InvalidParamError, MissingParamError } from '../../errors';
import { conflictError, invalidDataRequest, serverError } from '../../helpers/http-helper';
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

      const measure_types = [MeasureType.WATER, MeasureType.GAS];
      if (typeof customer_code !== 'string') return invalidDataRequest(new InvalidParamError('customer_code'));
      if (!measure_types.includes(measure_type)) return invalidDataRequest(new InvalidParamError('measure_type'));

      const isValidDatetime = !!new Date(measure_datetime).getTime();
      if (!isValidDatetime) return invalidDataRequest(new InvalidParamError('measure_datetime'));

      const measureByImage = await this.addMeasureByImage.add({ image, customer_code, measure_datetime, measure_type });
      return measureByImage;
    } catch (error) {
      if (error.name === 'ConflictError') return conflictError(error);
      return serverError();
    }
  }
}
