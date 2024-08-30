import { randomUUID } from 'crypto';

import {
  AddMeasureByImageDTO,
  AddMeasureByImageRepository,
} from '../../../../data/protocols/add-measure-by-image-repository';
import {
  ChecksReadingInMonthDTO,
  ChecksReadingInMonthRepository,
} from '../../../../data/protocols/checks-reading-in-month';
import { ConfirmMeasurementRepository } from '../../../../data/protocols/confirm-measurement-repository';
import { FindMeasurementsRepository } from '../../../../data/protocols/find-measurements-repository';
import { Measure } from '../../../../domain/models/measure';
import { MeasureByImageModel } from '../../../../domain/models/measure-by-image';
import { mongoHelper } from '../helpers/mongo-helper';

export class MeasureRepository
  implements
    AddMeasureByImageRepository,
    ChecksReadingInMonthRepository,
    ConfirmMeasurementRepository,
    FindMeasurementsRepository
{
  async add(addMeasureByImageDTO: AddMeasureByImageDTO): Promise<MeasureByImageModel> {
    const measurementsCollection = mongoHelper.getCollection('measurements');
    const { insertedId: id } = await measurementsCollection.insertOne({
      ...addMeasureByImageDTO,
      measure_uuid: randomUUID(),
      has_confirmed: false,
    });
    const result = await measurementsCollection.findOne({ _id: id });

    const { measure_uuid, image_url, measure_value } = mongoHelper.map(result);

    return {
      image_url,
      measure_value,
      measure_uuid,
    } as MeasureByImageModel;
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

  async findById(measure_uuid: string): Promise<Measure | null> {
    const measurementsCollection = mongoHelper.getCollection('measurements');

    const result = await measurementsCollection.findOne({ measure_uuid });

    if (!result) return null;

    const { image_url, measure_type, measure_datetime, has_confirmed } = mongoHelper.map(result);

    return {
      measure_uuid,
      has_confirmed,
      image_url,
      measure_datetime,
      measure_type,
    };
  }

  async confirm(measure_uuid: string, measure_value: number): Promise<void> {
    const measurementsCollection = mongoHelper.getCollection('measurements');

    await measurementsCollection.updateOne({ measure_uuid }, { $set: { measure_value, has_confirmed: true } });
  }
}
