import {
  AddMeasureByImage,
  AddMeasureByImageModel,
  AddMeasureByImageRepository,
  MeasureByImageModel,
  MeasurementAnalyzer,
} from './db-add-measure-by-image-protocols';

export class DBAddMeasureByImage implements AddMeasureByImage {
  constructor(
    private readonly measurementAnalyzer: MeasurementAnalyzer,
    private readonly addMeasureByImageRepository: AddMeasureByImageRepository,
  ) {}

  async add({
    image,
    customer_code,
    measure_datetime,
    measure_type,
  }: AddMeasureByImageModel): Promise<MeasureByImageModel> {
    const prompt = `
      Nossa tarefa é extrair e interpretar informações de consumo de água e gás a partir de fotos de medidores. Para garantir a precisão da medição, siga as instruções abaixo:
      Identificação do Medidor:
      Tipo de Medidor: Determine se a foto é de um medidor de água ou gás.
      Qualidade da Imagem:
      Para Medidores de Água: Extraia os dígitos em PRETO.
      Para Medidores de Gás: Extraia os dígitos em PRETO.
      Observação: Caso o número comece com 1 ou mais "0" pode ignora-lós até chegar em um dígito >= 1.
      Formato de Saída:
      Quando for medidor de água: "Água: X METROS CÚBICOS", onde "X" é o valor encontrado por você.
      Quando for medidor de gás: "Gás: X METROS CÚBICOS", onde "X" é o valor encontrado por você.

      Por favor, processe a imagem e forneça o consumo extraído no formato pedido acima."
    `.trim();
    const measureValue = await this.measurementAnalyzer.analyze(prompt, image);

    const addedMeasure = await this.addMeasureByImageRepository.add({
      customer_code,
      image_url: 'valid_url',
      measure_datetime,
      measure_type,
      measure_value: measureValue,
    });

    return addedMeasure;
  }
}
