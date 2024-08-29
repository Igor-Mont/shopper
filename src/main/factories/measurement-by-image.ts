import { DBAddMeasureByImage } from '../../data/usecases/db-measure-by-image/db-add-measure-by-image';
import { GeminiVisionAdapter } from '../../infra/ai/gemini-vision-adpater';
import { MeasureRepository } from '../../infra/db/mongodb/measure-repository/measure';
import { MeasurementByImageController } from '../../presentation/controllers/measurement-by-image/measurement-by-image';
import { Base64ValidatorAdapter } from '../../utils/base64-validator-adapter';

export const makeMeasurementByImageController = (): MeasurementByImageController => {
  const base64ValidatorAdpter = new Base64ValidatorAdapter();
  const geminiVisionAdapter = new GeminiVisionAdapter();
  const measureRepository = new MeasureRepository();
  const dbAddMeasureByImage = new DBAddMeasureByImage(geminiVisionAdapter, measureRepository);
  const measurementByImageController = new MeasurementByImageController(base64ValidatorAdpter, dbAddMeasureByImage);
  return measurementByImageController;
};
