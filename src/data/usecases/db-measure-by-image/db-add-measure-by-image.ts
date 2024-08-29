import { MeasureByImageModel } from '../../../domain/models/measure-by-image';
import { AddMeasureByImage, AddMeasureByImageModel } from '../../../domain/usecases/add-measure-by-image';
import { AddMeasureByImageRepository } from '../../protocols/add-measure-by-image-repository';
import { MeasurementAnalyzer } from '../../protocols/measurement-analyzer';

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
