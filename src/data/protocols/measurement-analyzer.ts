export interface MeasurementAnalyzer {
  analyze(prompt: string, base64: string): Promise<number>;
}
