export interface FileManager {
  uploadFile(
    filePath: string,
    fileMetadata: { mimeType: string; displayName: string },
  ): Promise<any>;
}
