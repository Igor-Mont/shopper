import { GoogleGenerativeAI } from '@google/generative-ai';

import { MeasurementAnalyzer } from '../../data/protocols/measurement-analyzer';

export class GeminiVisionAdapter implements MeasurementAnalyzer {
  async analyze(prompt: string, base64: string): Promise<number> {
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-vision' });
    const image = {
      inlineData: {
        data: base64,
        mimeType: 'image/png',
      },
    };

    const result = await model.generateContent([prompt, image]);

    // console.log({ result });
    return 10;
  }
}
