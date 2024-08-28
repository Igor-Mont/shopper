import validator from 'validator';

import { Base64ValidatorAdapter } from './base64-validator-adapter';

jest.mock('validator', () => ({
  isBase64(): boolean {
    return true;
  },
}));
describe('Base64Validator Adapter', () => {
  test('Should returns false if validator returns false', () => {
    const sut = new Base64ValidatorAdapter();
    jest.spyOn(validator, 'isBase64').mockReturnValueOnce(false);
    const isBase64Valid = sut.isValid('invalid_base64');

    expect(isBase64Valid).toBe(false);
  });

  test('Should returns true if validator returns true', () => {
    const sut = new Base64ValidatorAdapter();
    const isBase64Valid = sut.isValid('valid_base64');

    expect(isBase64Valid).toBe(true);
  });
});
