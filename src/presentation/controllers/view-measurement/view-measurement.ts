import { Measure } from '../../../domain/models/measure';
import { InvalidParamError } from '../../errors';
import { invalidDataRequest, notFoundError, serverError } from '../../helpers/http-helper';
import { ListMeasurementsByCustomer } from './view-measurement-protocols';
import { Controller, HttpRequest, HttpResponse } from './view-measurement-protocols';

export class ViewMeasurementController implements Controller {
  constructor(private readonly listMeasurementsByCustomer: ListMeasurementsByCustomer) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { params: requestRouteParams } = httpRequest;

      const { customer_code = null, measure_uuid = null } = requestRouteParams;

      if (!customer_code) return invalidDataRequest(new InvalidParamError('customer_code'));
      if (!measure_uuid) return invalidDataRequest(new InvalidParamError('measure_uuid'));

      const { measures } = await this.listMeasurementsByCustomer.listMeasurementsByCustomer(customer_code, true);

      const measuresWithBase64 = measures as Measure[];
      return measuresWithBase64.find((measure) => measure.measure_uuid === measure_uuid).image || '';
    } catch (error) {
      if (error.name === 'NotFoundError') return notFoundError(error);
      return serverError();
    }
  }
}
