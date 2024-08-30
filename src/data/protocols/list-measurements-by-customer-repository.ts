import { Measure } from '../../domain/models/measure';
import { MeasureType } from '../../domain/models/measure-type';

export interface ListMeasurementsByCustomerRepository {
  listMeasurementsByCustomer(customer_code: string, measure_type?: MeasureType): Promise<Measure[]>;
}
