import { GenerativeModel } from '../../domain/entities/GenerativeModel';

export class GenerateText {
  constructor(private model: GenerativeModel) {}

  async execute(prompt: string): Promise<string> {
    const response = await this.model.generateContent([{ text: prompt }]);
    return response.response.text();
  }
}
