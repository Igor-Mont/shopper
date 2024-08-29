import {
  AddMeasureByImage,
  AddMeasureByImageModel,
  AddMeasureByImageRepository,
  MeasureByImageModel,
  MeasurementAnalyzer,
} from './db-add-measure-by-image-protocols';

export class DBAddMeasureByImage implements AddMeasureByImage {
  constructor(
    private readonly measurementAnalyzer: MeasurementAnalyzer,
    private readonly addMeasureByImageRepository: AddMeasureByImageRepository,
  ) {}

  async add({
    image,
    customer_code,
    measure_datetime,
    measure_type,
  }: AddMeasureByImageModel): Promise<MeasureByImageModel> {
    const measureValue = await this.measurementAnalyzer.analyze('PROMPT', image);
    const addedMeasure = await this.addMeasureByImageRepository.add({
      customer_code,
      image_url: 'valid_url',
      measure_datetime,
      measure_type,
      measure_value: measureValue,
    });
    return addedMeasure;
  }
}
