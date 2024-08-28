import { MissingParamError } from './errors/missing-param-error';
import { MeasurementByImageController } from './measurement-by-image';

const makeSut = (): MeasurementByImageController => new MeasurementByImageController();
describe('MeasurementByImage Controller', () => {
  test('Should return error_code "INVALID_DATA" if no image is provided', () => {
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
    const sut = makeSut();
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
});
