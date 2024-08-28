import validator from 'validator';

import { Base64ValidatorAdapter } from './base64-validator-adapter';

jest.mock('validator', () => ({
  isBase64(): boolean {
    return true;
  },
}));

const makeSut = (): Base64ValidatorAdapter => {
  return new Base64ValidatorAdapter();
};

describe('Base64Validator Adapter', () => {
  test('Should returns false if validator returns false', () => {
    const sut = makeSut();
    jest.spyOn(validator, 'isBase64').mockReturnValueOnce(false);
    const isBase64Valid = sut.isValid('invalid_base64');

    expect(isBase64Valid).toBe(false);
  });

  test('Should returns true if validator returns true', () => {
    const sut = makeSut();
    const isBase64Valid = sut.isValid('valid_base64');

    expect(isBase64Valid).toBe(true);
  });

  test('Should call validator with correct base64', () => {
    const sut = makeSut();
    const isBase64Spy = jest.spyOn(validator, 'isBase64');
    const isBase64Valid = sut.isValid('valid_base64');

    expect(isBase64Spy).toHaveBeenCalledWith('valid_base64');
  });
});
