import { DBAddMeasureByImage } from './db-add-measure-by-image';
import {
  MeasureByImageModel,
  MeasurementAnalyzer,
  AddMeasureByImageDTO,
  AddMeasureByImageRepository,
  AddMeasureByImageModel,
} from './db-add-measure-by-image-protocols';

export interface SutTypes {
  sut: DBAddMeasureByImage;
  measurementAnalyzerStub: MeasurementAnalyzer;
  addMeasureByImageRepositoryStub: AddMeasureByImageRepository;
}

const makeAddMeasureByImageRepository = (): AddMeasureByImageRepository => {
  class AddMeasureByImageRepositoryStub implements AddMeasureByImageRepository {
    async add(addMeasureByImageDTO: AddMeasureByImageDTO): Promise<MeasureByImageModel> {
      const fakeMeasure = {
        image_url: 'valid_url',
        measure_uuid: 'uuid',
        measure_value: 10,
      };

      return new Promise((resolve) => resolve(fakeMeasure));
    }
  }

  return new AddMeasureByImageRepositoryStub();
};

const makeMeasurementAnalyzer = (): MeasurementAnalyzer => {
  class MeasurementAnalyzerStub implements MeasurementAnalyzer {
    async analyze(prompt: string, base64: string): Promise<number> {
      return new Promise((resolve) => resolve(10));
    }
  }

  return new MeasurementAnalyzerStub();
};

const makeSut = (): SutTypes => {
  const addMeasureByImageRepositoryStub = makeAddMeasureByImageRepository();
  const measurementAnalyzerStub = makeMeasurementAnalyzer();
  const sut = new DBAddMeasureByImage(measurementAnalyzerStub, addMeasureByImageRepositoryStub);

  return {
    sut,
    measurementAnalyzerStub,
    addMeasureByImageRepositoryStub,
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

  test('Should call AddMeasureByImageRepository with correct values', async () => {
    const { sut, addMeasureByImageRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addMeasureByImageRepositoryStub, 'add');
    const addMeasureByImage: AddMeasureByImageModel = {
      image: 'valid_base64',
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'valid_type',
    };
    await sut.add(addMeasureByImage);
    expect(addSpy).toHaveBeenCalledWith({
      image_url: 'valid_url',
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'valid_type',
      measure_value: 10,
    });
  });

  test('Should throws if AddMeasureByImageRepository throws', async () => {
    const { sut, addMeasureByImageRepositoryStub } = makeSut();
    jest
      .spyOn(addMeasureByImageRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const addMeasureByImage: AddMeasureByImageModel = {
      image: 'valid_base64',
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'valid_type',
    };
    const addPromise = sut.add(addMeasureByImage);
    await expect(addPromise).rejects.toThrow();
  });

  test('Should return an measure on success', async () => {
    const { sut, addMeasureByImageRepositoryStub } = makeSut();
    const addMeasureByImage: AddMeasureByImageModel = {
      image: 'valid_base64',
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'valid_type',
    };
    const account = await sut.add(addMeasureByImage);
    expect(account).toEqual({
      image_url: 'valid_url',
      measure_uuid: 'uuid',
      measure_value: 10,
    });
  });
});
