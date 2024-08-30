export interface ConfirmMeasurementRepository {
  confirm(measure_uuid: string, measure_value: number): Promise<void>;
}
