export interface ChecksReadingInMonthDTO {
  customer_code: string;
  measure_datetime: string;
}

export interface ChecksReadingInMonthRepository {
  check(checksReadingInMonthDTO: ChecksReadingInMonthDTO): Promise<boolean>;
}
