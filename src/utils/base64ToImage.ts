import { writeFileSync } from 'fs';
import { join } from 'path';

export function base64ToImage(base64String: string): string {
  const buffer = Buffer.from(base64String, 'base64');

  const fileName = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const filePath = join(
    __dirname.replace('src\\utils', 'uploads'),
    `./${fileName}.png`,
  );

  // Escreve o arquivo no disco
  writeFileSync(filePath, buffer);

  return filePath;
}
