import { MeasureType } from '../../../domain/models/measure-type';
import { InvalidParamError, InvalidTypeError, MissingParamError } from '../../errors';
import { invalidDataRequest, notFoundError, serverError } from '../../helpers/http-helper';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  ListMeasurementsByCustomer,
} from './list-measurements-by-customer-protocols';

export class ListMeasurementsByCustomerController implements Controller {
  constructor(private readonly listMeasurementsByCustomer: ListMeasurementsByCustomer) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredRouteParams = ['customer_code'];

      const { params: requestRouteParams, query: requestQueryParams } = httpRequest;
      for (const field of requiredRouteParams) {
        if (!requestRouteParams[field]) {
          return invalidDataRequest(new MissingParamError(field));
        }
      }

      const measure_types = [MeasureType.WATER, MeasureType.GAS];
      if (requestQueryParams.measure_type && !measure_types.includes(requestQueryParams.measure_type))
        return invalidDataRequest(new InvalidTypeError('Tipo de medição não permitida'));

      const { customer_code } = requestRouteParams;

      if (typeof customer_code !== 'string') return invalidDataRequest(new InvalidParamError('customer_code'));

      const measuresByCustomer = await this.listMeasurementsByCustomer.listMeasurementsByCustomer(
        customer_code,
        requestQueryParams.measure_type,
      );

      return measuresByCustomer;
    } catch (error) {
      if (error.name === 'NotFoundError') return notFoundError(error, 'MEASURES_NOT_FOUND');

      return serverError();
    }
  }
}
