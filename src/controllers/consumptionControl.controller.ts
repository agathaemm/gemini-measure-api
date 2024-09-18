import { Request, Response, NextFunction, text } from 'express';

import { GenerateText } from '../application/useCases/GenerateText';
import { geminiGateway, googleApiFileGateway } from '../app';
import { Upload } from '../application/useCases/Upload';

async function postText(req: Request, res: Response, next: NextFunction) {
  const prompt = req.body;
  const generateTextUseCase = new GenerateText(geminiGateway);
  const result = await generateTextUseCase.execute(prompt.prompt);
  if (result) res.status(201).json(result);
  else res.sendStatus(400);
}

async function upload(req: Request, res: Response, next: NextFunction) {
  const file = req.file;
  if (!file) {
    res.sendStatus(400);
    return;
  }

  const uploadUseCase = new Upload(googleApiFileGateway);
  const fileResponse = await uploadUseCase.upload(file.path, {
    mimeType: file.mimetype,
    displayName: 'Jetpack drawing',
  });

  const generateTextUseCase = new GenerateText(geminiGateway);
  const result = await generateTextUseCase.execute([
    {
      fileData: {
        mimeType: fileResponse.file.mimeType,
        fileUri: fileResponse.file.uri,
      },
    },
    { text: 'Describe how this product might be manufactured.' },
  ]);

  if (result) res.status(201).json(result);
  else res.sendStatus(400);
}

export default {
  postText,
  upload,
};
