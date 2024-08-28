import { InvalidParamError } from './errors/invalid-param-error';
import { MissingParamError } from './errors/missing-param-error';
import { MeasurementByImageController } from './measurement-by-image';
import { Base64Validator } from './protocols/base64-validor';

interface SutTypes {
  sut: MeasurementByImageController;
  base64ValidatorStub: Base64Validator;
}

const makeSut = (): SutTypes => {
  class Base64ValidatorStub implements Base64Validator {
    isValid(base64: string): boolean {
      return true;
    }
  }

  const base64ValidatorStub = new Base64ValidatorStub();
  const sut = new MeasurementByImageController(base64ValidatorStub);
  return {
    sut,
    base64ValidatorStub,
  };
};
describe('MeasurementByImage Controller', () => {
  test('Should return error_code "INVALID_DATA" if no image is provided', () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        customer_code: 'any customer_code',
        measure_datetime: 'any datetime',
        measure_type: 'any measure_type',
      },
    };
    const httpResponse = sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toEqual(new MissingParamError('image'));
  });

  test('Should return error_code "INVALID_DATA" if no customer_code is provided', () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: 'any base64',
        measure_datetime: 'any datetime',
        measure_type: 'any measure_type',
      },
    };
    const httpResponse = sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toEqual(new MissingParamError('customer_code'));
  });

  test('Should return error_code "INVALID_DATA" if no measure_datetime is provided', () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: 'any base64',
        customer_code: 'any customer_code',
        measure_type: 'any measure_type',
      },
    };
    const httpResponse = sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toEqual(new MissingParamError('measure_datetime'));
  });

  test('Should return error_code "INVALID_DATA" if no measure_type is provided', () => {
    const { sut } = makeSut();
    const httRequest = {
      body: {
        image: 'any base64',
        customer_code: 'any customer_code',
        measure_datetime: 'any datetime',
      },
    };
    const httpResponse = sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toEqual(new MissingParamError('measure_type'));
  });

  test('Should return error_code "INVALID_DATA" if an invalid base64 is provided', () => {
    const { sut, base64ValidatorStub } = makeSut();
    jest.spyOn(base64ValidatorStub, 'isValid').mockReturnValueOnce(false);
    const httRequest = {
      body: {
        image: 'invalid base64',
        customer_code: 'any customer_code',
        measure_datetime: 'any datetime',
        measure_type: 'any',
      },
    };
    const httpResponse = sut.handle(httRequest);
    expect(httpResponse.error_code).toBe('INVALID_DATA');
    expect(httpResponse.error_description).toEqual(new InvalidParamError('image'));
  });
});
