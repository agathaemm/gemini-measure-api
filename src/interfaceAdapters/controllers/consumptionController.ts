import { Request, Response } from 'express';

import { GenerateText } from '../../application/useCases/GenerateText';
import { geminiGateway, googleApiFileGateway } from '../../app';
import { Upload } from '../../application/useCases/Upload';

async function upload(req: Request, res: Response) {
  const image = req.file;

  const { customer_code, measure_datetime, measure_type } = req.body;

  if (!image) {
    res.sendStatus(400);
    return;
  }

  const uploadUseCase = new Upload(googleApiFileGateway);
  const fileResponse = await uploadUseCase.upload(image.path, {
    mimeType: image.mimetype,
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
    {
      text: 'Quantos metros cubicos o hidrometro está marcando? Responda utilizando json no seguinte formato: { valor: %s }',
    },
  ]);

  if (result) res.status(201).json(JSON.parse(result));
  else res.sendStatus(400);
}

export default {
  upload,
};
