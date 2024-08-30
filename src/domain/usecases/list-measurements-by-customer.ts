import { Measure, MeasureWithoutBase64 } from '../models/measure';
import { MeasureType } from '../models/measure-type';

export interface ListMeasurementsByCustomerModel {
  customer_code: string;
  measures: Measure[] | MeasureWithoutBase64[];
}

export interface ListMeasurementsByCustomer {
  listMeasurementsByCustomer(
    customer_code: string,
    show_base64?: boolean,
    measure_type?: MeasureType,
  ): Promise<ListMeasurementsByCustomerModel>;
}
