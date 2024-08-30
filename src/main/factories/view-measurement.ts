import { DBListMeasurementsByCustomer } from '../../data/usecases/db-list-measurements-by-customer/db-list-measurements-by-customer';
import { MeasureRepository } from '../../infra/db/mongodb/measure-repository/measure';
import { ViewMeasurementController } from '../../presentation/controllers/view-measurement/view-measurement';

export const makeViewMeasurementController = (): ViewMeasurementController => {
  const measureRepository = new MeasureRepository();
  const dBListMeasurementsByCustomer = new DBListMeasurementsByCustomer(measureRepository);
  const viewMeasurementController = new ViewMeasurementController(dBListMeasurementsByCustomer);
  return viewMeasurementController;
};
