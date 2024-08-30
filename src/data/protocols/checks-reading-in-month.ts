import { MeasureType } from '../../domain/models/measure-type';

export interface ChecksReadingInMonthDTO {
  customer_code: string;
  measure_datetime: string;
  measure_type: MeasureType;
}

export interface ChecksReadingInMonthRepository {
  check(checksReadingInMonthDTO: ChecksReadingInMonthDTO): Promise<boolean>;
}
