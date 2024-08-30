import { NotFoundError } from '../../errors/not-found-error';
import {
  ListMeasurementsByCustomer,
  ListMeasurementsByCustomerModel,
  ListMeasurementsByCustomerRepository,
  MeasureType,
} from './db-list-measurements-by-customer-protocols';

export class DBListMeasurementsByCustomer implements ListMeasurementsByCustomer {
  constructor(private readonly listMeasurementsByCustomerRepository: ListMeasurementsByCustomerRepository) {}

  async listMeasurementsByCustomer(
    customer_code: string,
    measure_type?: MeasureType,
  ): Promise<ListMeasurementsByCustomerModel> {
    const measures = await this.listMeasurementsByCustomerRepository.listMeasurementsByCustomer(
      customer_code,
      measure_type,
    );

    if (!measures.length) throw new NotFoundError('Nenhuma leitura encontrada');

    const listMeasurementsByCustomerModel: ListMeasurementsByCustomerModel = {
      customer_code,
      measures,
    };

    return listMeasurementsByCustomerModel;
  }
}
