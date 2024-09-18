import { UploadFileResponse } from '@google/generative-ai/dist/server/server';
import { FileManager } from '../../domain/entities/FileManager';

export class Upload {
  constructor(private fileManager: FileManager) {}

  async upload(
    filePath: string,
    fileMetadata: { mimeType: string; displayName: string },
  ): Promise<UploadFileResponse> {
    const response = await this.fileManager.uploadFile(filePath, fileMetadata);
    return response;
  }
}
