import { Request, Response } from 'express';

import { GenerateText } from '../../application/useCases/GenerateText';
import { geminiGateway, googleApiFileGateway } from '../../app';
import { Upload } from '../../application/useCases/Upload';
import { base64ToImage } from '../../utils/base64ToImage';

async function upload(req: Request, res: Response) {
  const { customer_code, measure_datetime, measure_type, file } = req.body;

  const filePath = base64ToImage(file);

  const uploadUseCase = new Upload(googleApiFileGateway);
  const fileResponse = await uploadUseCase.upload(filePath, {
    mimeType: 'image/png',
    displayName: 'hidrometro',
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
