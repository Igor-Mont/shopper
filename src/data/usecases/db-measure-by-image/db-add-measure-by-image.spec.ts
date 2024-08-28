import { AddMeasureByImageModel } from '../../../domain/usecases/add-measure-by-image';
import { MeasurementAnalyzer } from '../../protocols/measurement-analyzer';
import { DBAddMeasureByImage } from './db-add-measure-by-image';

export interface SutTypes {
  sut: DBAddMeasureByImage;
  measurementAnalyzerStub: MeasurementAnalyzer;
}

const makeMeasurementAnalyzer = (): MeasurementAnalyzer => {
  class MeasurementAnalyzerStub implements MeasurementAnalyzer {
    async analyze(prompt: string, base64: string): Promise<number> {
      return new Promise((resolve) => resolve(10));
    }
  }

  return new MeasurementAnalyzerStub();
};

const makeSut = (): SutTypes => {
  const measurementAnalyzerStub = makeMeasurementAnalyzer();
  const sut = new DBAddMeasureByImage(measurementAnalyzerStub);

  return {
    sut,
    measurementAnalyzerStub,
  };
};

describe('DBMeasureByImage Usecase', () => {
  test('Should call MeasurementAnalyzer with correct values', async () => {
    const { sut, measurementAnalyzerStub } = makeSut();
    const analyzeSpy = jest.spyOn(measurementAnalyzerStub, 'analyze');
    const addMeasureByImage: AddMeasureByImageModel = {
      image: 'valid_base64',
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'valid_type',
    };
    await sut.add(addMeasureByImage);
    expect(analyzeSpy).toHaveBeenCalledWith('PROMPT', 'valid_base64');
  });

  test('Should throws if MeasurementAnalyzer throws', async () => {
    const { sut, measurementAnalyzerStub } = makeSut();
    jest
      .spyOn(measurementAnalyzerStub, 'analyze')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const addMeasureByImage: AddMeasureByImageModel = {
      image: 'valid_base64',
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'valid_type',
    };
    const analyzePromise = sut.add(addMeasureByImage);
    await expect(analyzePromise).rejects.toThrow();
  });
});
