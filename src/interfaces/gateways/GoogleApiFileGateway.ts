import {
  GoogleAIFileManager,
  UploadFileResponse,
} from '@google/generative-ai/server';

import { FileManager } from '../../domain/entities/FileManager';

export class GoogleApiFileGateway implements FileManager {
  constructor(private apiKey: string) {}

  async uploadFile(
    filePath: string,
    fileMetadata: { mimeType: string; displayName: string },
  ): Promise<UploadFileResponse> {
    const fileManager = new GoogleAIFileManager(this.apiKey);
    return await fileManager.uploadFile(filePath, fileMetadata);
  }
}
