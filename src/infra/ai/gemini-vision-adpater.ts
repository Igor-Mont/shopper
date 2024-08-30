import { GoogleGenerativeAI } from '@google/generative-ai';

import { MeasurementAnalyzer } from '../../data/protocols/measurement-analyzer';

export class GeminiVisionAdapter implements MeasurementAnalyzer {
  async analyze(prompt: string, base64: string): Promise<number> {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const image = {
      inlineData: {
        data: base64,
        mimeType: 'image/png',
      },
    };
    const {
      response: { text },
    } = await model.generateContent([prompt, image]);

    const response = text();
    const getValueInCubicMeters = (response: string) => Number(response.split(' ')[1].slice(0, -3));
    const cubicMetersToLiters = (cubicMeters: number) => cubicMeters * 1000;
    return cubicMetersToLiters(getValueInCubicMeters(response));
  }
}
