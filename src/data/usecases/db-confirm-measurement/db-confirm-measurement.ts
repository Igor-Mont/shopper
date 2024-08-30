import { MeasurementConfirmed } from '../../../domain/models/measurement-confirmed';
import { ConflictError } from '../../errors/conflict-error';
import { NotFoundError } from '../../errors/not-found-error';
import { FindMeasurementsRepository } from '../../protocols/find-measurements-repository';
import {
  ConfirmMeasurement,
  ConfirmMeasurementModel,
  ConfirmMeasurementRepository,
} from './db-confirm-measurement-protocols';

export class DBConfirmMeasurement implements ConfirmMeasurement {
  constructor(
    private readonly confirmMeasurementRepository: ConfirmMeasurementRepository,
    private readonly findMeasurementsRepository: FindMeasurementsRepository,
  ) {}

  async confirm({ measure_uuid, confirmed_value }: ConfirmMeasurementModel): Promise<MeasurementConfirmed> {
    const measurementAlreadyExists = await this.findMeasurementsRepository.findById(measure_uuid);
    if (!measurementAlreadyExists) throw new NotFoundError('Leitura não encontrada.');

    const { has_confirmed } = measurementAlreadyExists;
    if (has_confirmed) throw new ConflictError('Leitura do mês já confirmada.');

    await this.confirmMeasurementRepository.confirm(measure_uuid, confirmed_value);
    return {
      success: true,
    };
  }
}
