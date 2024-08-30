import { MeasureWithoutBase64 } from '../../domain/models/measure';

export interface FindMeasurementsRepository {
  findById(measure_uuid: string): Promise<MeasureWithoutBase64 | null>;
}
