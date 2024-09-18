export interface GenerativeModel {
  generateContent(
    prompt: Array<any>,
  ): Promise<{ response: { text: () => string } }>;
}
