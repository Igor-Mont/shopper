import { mongoHelper as sut } from '../helpers/mongo-helper';
import { MeasureRepository } from './measure';

describe.skip('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should return an measure on success', async () => {
    const sut = new MeasureRepository();
    const measure = await sut.add({
      customer_code: '1',
      image_url: 'url',
      measure_type: 'type',
      measure_datetime: 'datetime',
      measure_value: 10,
    });

    expect(measure).toBeTruthy();
    expect(measure).toHaveProperty('measure_uuid');
    expect(measure).toHaveProperty('measure_value');
    expect(measure).toHaveProperty('image_url');
  });
});
