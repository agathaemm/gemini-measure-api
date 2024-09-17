export interface GenerativeModel {
  generateContent(
    prompt: string,
  ): Promise<{ response: { text: () => string } }>;
}
