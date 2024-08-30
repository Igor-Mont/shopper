import { Measure } from '../../domain/models/measure';

export interface FindMeasurementsRepository {
  // findAll(): Promise<Measure[]>;
  findById(measure_uuid: string): Promise<Measure | null>;
}
