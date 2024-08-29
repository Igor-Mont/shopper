import { GeminiVisionAdapter } from './gemini-vision-adpater';

interface SutTypes {
  sut: GeminiVisionAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new GeminiVisionAdapter();

  return {
    sut,
  };
};

describe('GeminiVision Adapter', () => {
  test('Should call ', () => {
    const { sut } = makeSut();
    // jest.spyOn()
    // sut.analyze("")
  });
});
