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
    show_base64 = false,
    measure_type?: MeasureType,
  ): Promise<ListMeasurementsByCustomerModel> {
    const measures = await this.listMeasurementsByCustomerRepository.listMeasurementsByCustomer(
      customer_code,
      measure_type,
    );

    if (!measures.length) throw new NotFoundError('Nenhuma leitura encontrada');

    if (!show_base64) {
      const listMeasurementsByCustomerModel: ListMeasurementsByCustomerModel = {
        customer_code,
        measures: measures.map(({ image, ...measureWithoutBase64 }) => measureWithoutBase64),
      };

      return listMeasurementsByCustomerModel;
    }

    const listMeasurementsByCustomerModel: ListMeasurementsByCustomerModel = {
      customer_code,
      measures,
    };

    return listMeasurementsByCustomerModel;
  }
}
