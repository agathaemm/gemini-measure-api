import { GoogleGenerativeAI } from '@google/generative-ai';

export class GoogleGenerativeAIService {
  private genAI: any;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async getModel(modelName: string) {
    return await this.genAI.getGenerativeModel({ model: modelName });
  }
}
