import { MeasureByImageModel } from '../models/measure-by-image';

export interface AddMeasureByImageModel {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
}

export interface AddMeasureByImage {
  add(addMeasureByImageModel: AddMeasureByImageModel): MeasureByImageModel;
}
