import { UploadFileResponse } from '@google/generative-ai/dist/server/server';

export interface FileManager {
  uploadFile(
    filePath: string,
    fileMetadata: { mimeType: string; displayName: string },
  ): Promise<UploadFileResponse>;
}
