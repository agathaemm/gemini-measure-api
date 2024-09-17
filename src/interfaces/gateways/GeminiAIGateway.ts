// src/interfaces/gateways/GeminiAIGateway.ts
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GenerativeModel } from '../../domain/entities/GenerativeModel';

export class GeminiAIGateway implements GenerativeModel {
  constructor(private apiKey: string) {}

  async generateContent(
    prompt: string,
  ): Promise<{ response: { text: () => string } }> {
    const genAI = new GoogleGenerativeAI(this.apiKey);
    const model = await genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
    const result = await model.generateContent(prompt);
    return result;
  }
}
