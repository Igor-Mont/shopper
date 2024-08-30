import { InvalidParamError, MissingParamError } from '../../errors';
import { conflictError, invalidDataRequest, notFoundError, serverError } from '../../helpers/http-helper';
import { ConfirmMeasurement } from './confirm-measurement-protocols';
import { Controller, HttpRequest, HttpResponse } from './confirm-measurement-protocols';

export class ConfirmMeasurementController implements Controller {
  constructor(private readonly confirmMeasurement: ConfirmMeasurement) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['measure_uuid', 'confirmed_value'];

      const { body: requestBody } = httpRequest;
      for (const field of requiredFields) {
        if (!requestBody[field]) {
          return invalidDataRequest(new MissingParamError(field));
        }
      }

      const { measure_uuid, confirmed_value } = requestBody;

      if (typeof measure_uuid !== 'string') return invalidDataRequest(new InvalidParamError('measure_uuid'));
      if (typeof confirmed_value !== 'number') return invalidDataRequest(new InvalidParamError('confirmed_value'));
      if (confirmed_value < 0) return invalidDataRequest(new InvalidParamError('confirmed_value'));

      const confirmed = await this.confirmMeasurement.confirm({ measure_uuid, confirmed_value });
      return confirmed;
    } catch (error) {
      if (error.name === 'ConflictError') return conflictError(error, 'CONFIRMATION_DUPLICATE');
      if (error.name === 'NotFoundError') return notFoundError(error);
      return serverError();
    }
  }
}
