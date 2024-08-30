import { Measure } from '../models/measure';
import { MeasureType } from '../models/measure-type';

export interface ListMeasurementsByCustomerModel {
  customer_code: string;
  measures: Measure[];
}

export interface ListMeasurementsByCustomer {
  listMeasurementsByCustomer(
    customer_code: string,
    measure_type?: MeasureType,
  ): Promise<ListMeasurementsByCustomerModel>;
}
