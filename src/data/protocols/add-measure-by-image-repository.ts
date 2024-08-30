import { MeasureByImageModel } from '../../domain/models/measure-by-image';

export interface AddMeasureByImageDTO {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: string;
  measure_value: number;
}

export interface AddMeasureByImageRepository {
  add(addMeasureByImageDTO: AddMeasureByImageDTO): Promise<MeasureByImageModel>;
}
