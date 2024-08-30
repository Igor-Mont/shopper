import { MeasurementConfirmed } from '../models/measurement-confirmed';

export interface ConfirmMeasurementModel {
  measure_uuid: string;
  confirmed_value: number;
}

export interface ConfirmMeasurement {
  confirm(confirmMeasurementModel: ConfirmMeasurementModel): Promise<MeasurementConfirmed>;
}
