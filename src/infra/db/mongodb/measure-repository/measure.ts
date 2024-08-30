import { randomUUID } from 'crypto';

import {
  AddMeasureByImageDTO,
  AddMeasureByImageRepository,
} from '../../../../data/protocols/add-measure-by-image-repository';
import {
  ChecksReadingInMonthDTO,
  ChecksReadingInMonthRepository,
} from '../../../../data/protocols/checks-reading-in-month';
import { MeasureByImageModel } from '../../../../domain/models/measure-by-image';
import { mongoHelper } from '../helpers/mongo-helper';

export class MeasureRepository implements AddMeasureByImageRepository, ChecksReadingInMonthRepository {
  async add(addMeasureByImageDTO: AddMeasureByImageDTO): Promise<MeasureByImageModel> {
    const measurementsCollection = mongoHelper.getCollection('measurements');
    const { insertedId: id } = await measurementsCollection.insertOne({
      ...addMeasureByImageDTO,
      id: randomUUID(),
      has_confirmed: false,
    });
    const result = await measurementsCollection.findOne({ _id: id });

    return mongoHelper.map(result);
  }

  async check({ customer_code, measure_datetime }: ChecksReadingInMonthDTO): Promise<boolean> {
    const measurementsCollection = mongoHelper.getCollection('measurements');

    const measuresInMonth = (await measurementsCollection.find().toArray()).filter((measure) => {
      const sameCustomerCode = measure.customer_code === customer_code;
      const targetDate = new Date(measure.measure_datetime);
      const sameMonth = targetDate.getMonth() === new Date(measure_datetime).getMonth();
      const sameYear = targetDate.getFullYear() === new Date(measure_datetime).getFullYear();
      return sameCustomerCode && sameMonth && sameYear;
    }).length;

    return measuresInMonth === 0;
  }
}
