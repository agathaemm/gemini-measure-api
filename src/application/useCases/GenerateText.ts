import { GenerativeModel } from '../../domain/entities/GenerativeModel';

export class GenerateText {
  constructor(private model: GenerativeModel) {}

  async execute(params: Array<any>): Promise<string> {
    const response = await this.model.generateContent(params);
    return response.response.text();
  }
}
