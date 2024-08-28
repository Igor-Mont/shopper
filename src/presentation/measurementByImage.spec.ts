import { MeasurementByImageController } from './measurementByImage';

describe('MeasurementByImage Controller', () => {
  test('Should return 400 if no image is provided', () => {
    const sut = new MeasurementByImageController();
    const httRequest = {
      body: {
        customer_code: 'any customer_code',
        measure_datetime: 'any datetime',
        measure_type: 'any measure_type',
      },
    };
    const httpResponse = sut.handle(httRequest);
    expect(httpResponse.error_code).toBe(400);
    expect(httpResponse.error_description).toEqual(new Error('Missing param: image'));
  });
});
