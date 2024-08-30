import { DBConfirmMeasurement } from '../../data/usecases/db-confirm-measurement/db-confirm-measurement';
import { MeasureRepository } from '../../infra/db/mongodb/measure-repository/measure';
import { ConfirmMeasurementController } from '../../presentation/controllers/confirm-measurement/confirm-measurement';

export const makeConfirmMeasurementController = (): ConfirmMeasurementController => {
  const measureRepository = new MeasureRepository();
  const dBConfirmMeasurement = new DBConfirmMeasurement(measureRepository, measureRepository);
  const confirmMeasurementController = new ConfirmMeasurementController(dBConfirmMeasurement);
  return confirmMeasurementController;
};
