import { MeasureByImageModel } from '../models/measure-by-image';
import { MeasureType } from '../models/measure-type';

export interface AddMeasureByImageModel {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: MeasureType;
}

export interface AddMeasureByImage {
  add(addMeasureByImageModel: AddMeasureByImageModel): Promise<MeasureByImageModel>;
}
