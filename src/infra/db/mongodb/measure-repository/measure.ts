import { randomUUID } from 'crypto';

import {
  AddMeasureByImageDTO,
  AddMeasureByImageRepository,
} from '../../../../data/protocols/add-measure-by-image-repository';
import { MeasureByImageModel } from '../../../../domain/models/measure-by-image';
import { mongoHelper } from '../helpers/mongo-helper';

export class MeasureRepository implements AddMeasureByImageRepository {
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
}
