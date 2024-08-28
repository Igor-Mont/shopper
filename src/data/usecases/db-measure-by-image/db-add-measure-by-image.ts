import { MeasureByImageModel } from '../../../domain/models/measure-by-image';
import { AddMeasureByImage, AddMeasureByImageModel } from '../../../domain/usecases/add-measure-by-image';
import { MeasurementAnalyzer } from '../../protocols/measurement-analyzer';

export class DBAddMeasureByImage implements AddMeasureByImage {
  constructor(private readonly measurementAnalyzer: MeasurementAnalyzer) {}

  async add(addMeasureByImageModel: AddMeasureByImageModel): Promise<MeasureByImageModel> {
    await this.measurementAnalyzer.analyze('PROMPT', addMeasureByImageModel.image);
    return new Promise((resolve) =>
      resolve({
        image_url: 'valid_url',
        measure_uuid: 'uuid',
        measure_value: 10,
      }),
    );
  }
}
