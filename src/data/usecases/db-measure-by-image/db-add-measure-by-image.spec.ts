import { ChecksReadingInMonthDTO, ChecksReadingInMonthRepository } from '../../protocols/checks-reading-in-month';
import { DBAddMeasureByImage } from './db-add-measure-by-image';
import {
  MeasureByImageModel,
  MeasurementAnalyzer,
  AddMeasureByImageDTO,
  AddMeasureByImageRepository,
  AddMeasureByImageModel,
} from './db-add-measure-by-image-protocols';

const valid_base64 =
  'iVBORw0KGgoAAAANSUhEUgAAAB8AAAAWCAYAAAA4oUfxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKVSURBVEhL7ZVdSFNRAMd/+bE1VJaZmuKuztxYD0tW4kMJQqGRvghlUFpgTyH1UPkW9PWaEUhCUFRg9GEo1UOfKPggSJQzlviRHzik5YbY0qXLm3W2e4wyYetpL/7gcu75n/+5f87nXaeY8n8SI+JkGRPWwmNClBsuiaTmCvKLFYw6UVVVAl4Xw02dBJ5rjjCldrY0lpPFOK6T7fh7pC4wtBxnx7YkfK+vM9QQCGtRjFyPsa0OR4lCStCDZ2QcjzeAPtuB41I1xlJpC9HlYuKVG1VnxnbKIkVB7W6sInhpuocxGRwicnhVEUqBHtXdyZuSe4zub2d030167gwwr1MoqFOkUUM9+4wht0qibQ+m+pCSRvoxByn4Gb/VzWLYpRE53JGNURS+Xieqpmhc/YD3m5jOzIwVHwkw09iNTyyV6cAuDI17saTBbM9TPHelRRJ5zS9WU1KlMD81zpdZqYWJJzlPLMW8k7clnSxIdZmExsMUl2VplRknvUeFx61Vl4l6txsyzWQV/PmI4ATZuApqk5MpMVWhAH/vu3+CQ0Q9cs/jK4yel1oUpDw8QaENFr7rWY8bV8Mj/F2yURL1yP+L+nKsNj2LIx30tX5kUWxM22k7Kycqcrjzk9inkL7d8Xfng6XY359h5xO7FCSKgumIHYPqFvfAAOrllwyOBEnMKyX3nF6aNOKNxtQL8n11Br0EywrJMlvIrjWjq7SwsaaI/AoLyXF+xm6/YK5PegWGa4fYmqPD13GfyRuhg/WD4NQi+jILm63p+F0DBCc1b+TwUOfWfqbtGSTl5rApPZWUDeLc+4YYbm7D17IkfQIx3YWVOcSLy6S/ZpTfLROf+Wo1k201kWafY+qBN9y29j+PCWvhMQB+ASMd1N79+9VQAAAAAElFTkSuQmCC';

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

const makeChecksReadingInMonthRepositoryRepository = (): ChecksReadingInMonthRepository => {
  class ChecksReadingInMonthRepositoryStub implements ChecksReadingInMonthRepository {
    check(checksReadingInMonthDTO: ChecksReadingInMonthDTO): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new ChecksReadingInMonthRepositoryStub();
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
  const checksReadingInMonthRepositoryRepositoryStub = makeChecksReadingInMonthRepositoryRepository();
  const measurementAnalyzerStub = makeMeasurementAnalyzer();
  const sut = new DBAddMeasureByImage(
    measurementAnalyzerStub,
    addMeasureByImageRepositoryStub,
    checksReadingInMonthRepositoryRepositoryStub,
  );

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
      image: valid_base64,
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'GAS',
    };
    await sut.add(addMeasureByImage);
    const prompt = `
      Nossa tarefa é extrair e interpretar informações de consumo de água e gás a partir de fotos de medidores. Para garantir a precisão da medição, siga as instruções abaixo:
      Identificação do Medidor:
      Tipo de Medidor: Determine se a foto é de um medidor de água ou gás.
      Qualidade da Imagem:
      Para Medidores de Água: Extraia os dígitos em PRETO.
      Para Medidores de Gás: Extraia os dígitos em PRETO.
      Observação: Caso o número comece com 1 ou mais "0" pode ignora-lós até chegar em um dígito >= 1.
      Formato de Saída:
      Quando for medidor de água: "Água: X METROS CÚBICOS", onde "X" é o valor encontrado por você.
      Quando for medidor de gás: "Gás: X METROS CÚBICOS", onde "X" é o valor encontrado por você.

      Por favor, processe a imagem e forneça o consumo extraído no formato pedido acima."
    `.trim();
    expect(analyzeSpy).toHaveBeenCalledWith(prompt, valid_base64);
  });

  test('Should throws if MeasurementAnalyzer throws', async () => {
    const { sut, measurementAnalyzerStub } = makeSut();
    jest
      .spyOn(measurementAnalyzerStub, 'analyze')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const addMeasureByImage: AddMeasureByImageModel = {
      image: valid_base64,
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'GAS',
    };
    const analyzePromise = sut.add(addMeasureByImage);
    await expect(analyzePromise).rejects.toThrow();
  });

  test('Should call AddMeasureByImageRepository with correct values', async () => {
    const { sut, addMeasureByImageRepositoryStub } = makeSut();
    const addSpy = jest.spyOn(addMeasureByImageRepositoryStub, 'add');
    const addMeasureByImage: AddMeasureByImageModel = {
      image: valid_base64,
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'GAS',
    };
    await sut.add(addMeasureByImage);
    expect(addSpy).toHaveBeenCalledWith({
      image_url: 'valid_url',
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'GAS',
      measure_value: 10,
    });
  });

  test('Should throws if AddMeasureByImageRepository throws', async () => {
    const { sut, addMeasureByImageRepositoryStub } = makeSut();
    jest
      .spyOn(addMeasureByImageRepositoryStub, 'add')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const addMeasureByImage: AddMeasureByImageModel = {
      image: valid_base64,
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'GAS',
    };
    const addPromise = sut.add(addMeasureByImage);
    await expect(addPromise).rejects.toThrow();
  });

  test('Should return an measure on success', async () => {
    const { sut, addMeasureByImageRepositoryStub } = makeSut();
    const addMeasureByImage: AddMeasureByImageModel = {
      image: valid_base64,
      customer_code: 'valid_customer_code',
      measure_datetime: 'valid_datetime',
      measure_type: 'GAS',
    };
    const account = await sut.add(addMeasureByImage);
    expect(account).toEqual({
      image_url: 'valid_url',
      measure_uuid: 'uuid',
      measure_value: 10,
    });
  });
});
