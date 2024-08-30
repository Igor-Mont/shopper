import { DBListMeasurementsByCustomer } from '../../data/usecases/db-list-measurements-by-customer/db-list-measurements-by-customer';
import { MeasureRepository } from '../../infra/db/mongodb/measure-repository/measure';
import { ListMeasurementsByCustomerController } from '../../presentation/controllers/list-measurements-by-customer/list-measurements-by-customer';

export const makeListMeasurementsByCustomerController = (): ListMeasurementsByCustomerController => {
  const measureRepository = new MeasureRepository();
  const dBListMeasurementsByCustomer = new DBListMeasurementsByCustomer(measureRepository);
  const listMeasurementsByCustomerController = new ListMeasurementsByCustomerController(dBListMeasurementsByCustomer);
  return listMeasurementsByCustomerController;
};
