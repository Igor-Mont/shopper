import { Measure } from '../../domain/models/measure';

export interface FindMeasurementsRepository {
  findById(measure_uuid: string): Promise<Measure | null>;
}
