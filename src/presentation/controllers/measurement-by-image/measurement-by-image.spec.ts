import { ServerError } from '../../errors';
import { MeasurementByImageController } from './measurement-by-image';
import {
  MeasureByImageModel,
  Base64Validator,
  AddMeasureByImage,
  AddMeasureByImageModel,
} from './measurement-by-image-protocols';

const valid_base64 =
  'iVBORw0KGgoAAAANSUhEUgAAAB8AAAAWCAYAAAA4oUfxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKVSURBVEhL7ZVdSFNRAMd/+bE1VJaZmuKuztxYD0tW4kMJQqGRvghlUFpgTyH1UPkW9PWaEUhCUFRg9GEo1UOfKPggSJQzlviRHzik5YbY0qXLm3W2e4wyYetpL/7gcu75n/+5f87nXaeY8n8SI+JkGRPWwmNClBsuiaTmCvKLFYw6UVVVAl4Xw02dBJ5rjjCldrY0lpPFOK6T7fh7pC4wtBxnx7YkfK+vM9QQCGtRjFyPsa0OR4lCStCDZ2QcjzeAPtuB41I1xlJpC9HlYuKVG1VnxnbKIkVB7W6sInhpuocxGRwicnhVEUqBHtXdyZuSe4zub2d030167gwwr1MoqFOkUUM9+4wht0qibQ+m+pCSRvoxByn4Gb/VzWLYpRE53JGNURS+Xieqpmhc/YD3m5jOzIwVHwkw09iNTyyV6cAuDI17saTBbM9TPHelRRJ5zS9WU1KlMD81zpdZqYWJJzlPLMW8k7clnSxIdZmExsMUl2VplRknvUeFx61Vl4l6txsyzWQV/PmI4ATZuApqk5MpMVWhAH/vu3+CQ0Q9cs/jK4yel1oUpDw8QaENFr7rWY8bV8Mj/F2yURL1yP+L+nKsNj2LIx30tX5kUWxM22k7Kycqcrjzk9inkL7d8Xfng6XY359h5xO7FCSKgumIHYPqFvfAAOrllwyOBEnMKyX3nF6aNOKNxtQL8n11Br0EywrJMlvIrjWjq7SwsaaI/AoLyXF+xm6/YK5PegWGa4fYmqPD13GfyRuhg/WD4NQi+jILm63p+F0DBCc1b+TwUOfWfqbtGSTl5rApPZWUDeLc+4YYbm7D17IkfQIx3YWVOcSLy6S/ZpTfLROf+Wo1k201kWafY+qBN9y29j+PCWvhMQB+ASMd1N79+9VQAAAAAElFTkSuQmCC';

interface SutTypes {
  sut: MeasurementByImageController;
  base64ValidatorStub: Base64Validator;
  addMeasureByImageStub: AddMeasureByImage;
}

const makeBase64Validator = (): Base64Validator => {
  class Base64ValidatorStub implements Base64Validator {
    isValid(base64: string): boolean {
      return true;
    }
  }

  return new Base64ValidatorStub();
};

const makeAddMeasureByImageStub = (): AddMeasureByImage => {
  class AddMeasureByImageStub implements AddMeasureByImage {
    async add(addMeasureByImageModel: AddMeasureByImageModel): Promise<MeasureByImageModel> {
      const fakeMeasure: MeasureByImageModel = {
        image_url: 'valid_url',
        measure_value: 1,
        measure_uuid: 'uuid',
      };

      return new Promise((resolve) => resolve(fakeMeasure));
    }
  }

  return new AddMeasureByImageStub();
};

const makeSut = (): SutTypes => {
  const base64ValidatorStub = makeBase64Validator();
  const addMeasureByImageStub = makeAddMeasureByImageStub();
  const sut = new MeasurementByImageController(base64ValidatorStub, addMeasureByImageStub);
  return {
    sut,
    base64ValidatorStub,
    addMeasureByImageStub,
  };
};
describe('MeasurementByImage Controller', () => {
  test('Should return error_code "INVALID_DATA" if no image is provided', async () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        customer_code: 'any customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'WATER',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toBe('Missing param: image');
  });

  test('Should return error_code "INVALID_DATA" if no customer_code is provided', async () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: valid_base64,
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'WATER',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toBe('Missing param: customer_code');
  });

  test('Should return error_code "INVALID_DATA" if no measure_datetime is provided', async () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: valid_base64,
        customer_code: 'any customer_code',
        measure_type: 'WATER',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toBe('Missing param: measure_datetime');
  });

  test('Should return error_code "INVALID_DATA" if no measure_type is provided', async () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: valid_base64,
        customer_code: 'any customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toBe('Missing param: measure_type');
  });

  test('Should return error_code "INVALID_DATA" if an invalid base64 is provided', async () => {
    const { sut, base64ValidatorStub } = makeSut();
    jest.spyOn(base64ValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httRequest = {
      body: {
        image: 'invalid_base64',
        customer_code: 'any customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'WATER',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toBe('Invalid param: image');
  });

  test('Should return error_code "INVALID_DATA" if an invalid measure_type is provided', async () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: 'invalid_base64',
        customer_code: 'any customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'INVALID_MEASURE_TYPE',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toBe('Invalid param: measure_type');
  });

  test('Should return error_code "INVALID_DATA" if an invalid measure_datetime is provided', async () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: 'invalid_base64',
        customer_code: 'any customer_code',
        measure_datetime: 'INVALID_MEASURE_DATETIME',
        measure_type: 'WATER',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toBe('Invalid param: measure_datetime');
  });

  test('Should call Base64Validator with correct base64', async () => {
    const { sut, base64ValidatorStub } = makeSut();
    const isBase64ValidSpy = jest.spyOn(base64ValidatorStub, 'isValid');
    const httRequest = {
      body: {
        image: valid_base64,
        customer_code: 'any customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'WATER',
      },
    };
    await sut.handle(httRequest);
    expect(isBase64ValidSpy).toHaveBeenCalledWith(valid_base64);
  });

  test('Should call AddMeasureByImage with correct values', async () => {
    const { sut, addMeasureByImageStub } = makeSut();
    const addMeasureSpy = jest.spyOn(addMeasureByImageStub, 'add');
    const httRequest = {
      body: {
        image: valid_base64,
        customer_code: 'any customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'WATER',
      },
    };
    await sut.handle(httRequest);
    expect(addMeasureSpy).toHaveBeenCalledWith({
      image: valid_base64,
      customer_code: 'any customer_code',
      measure_datetime: '2026-10-29T15:30:00Z',
      measure_type: 'WATER',
    });
  });

  test('Should return error_code "SERVER_ERROR" if Base64Validator throws', async () => {
    const { sut, base64ValidatorStub } = makeSut();
    jest.spyOn(base64ValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httRequest = {
      body: {
        image: 'base64',
        customer_code: 'any customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'WATER',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('SERVER_ERROR');
    expect(httpResponse.error_description).toEqual(new ServerError());
  });

  test('Should return error_code "SERVER_ERROR" if AddMeasureByImage throws', async () => {
    const { sut, addMeasureByImageStub } = makeSut();
    jest.spyOn(addMeasureByImageStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const httRequest = {
      body: {
        image: 'base64',
        customer_code: 'any customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'WATER',
      },
    };
    const httpResponse = await sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('SERVER_ERROR');
    expect(httpResponse.error_description).toEqual(new ServerError());
  });

  test('Should return success if valid data is provided', async () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: valid_base64,
        customer_code: 'valid_customer_code',
        measure_datetime: '2026-10-29T15:30:00Z',
        measure_type: 'WATER',
      },
    };
    const httpResponse = await sut.handle(httRequest);

    expect(httpResponse).toHaveProperty('image_url');
    expect(httpResponse).toHaveProperty('measure_value');
    expect(httpResponse).toHaveProperty('measure_uuid');
    expect(httpResponse).toEqual({
      image_url: 'valid_url',
      measure_value: 1,
      measure_uuid: 'uuid',
    });
  });
});
