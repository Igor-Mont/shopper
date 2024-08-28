import validator from 'validator';

import { Base64Validator } from '../presentation/protocols';

export class Base64ValidatorAdapter implements Base64Validator {
  isValid(base64: string): boolean {
    return validator.isBase64(base64);
  }
}
