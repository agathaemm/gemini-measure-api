import { Request, Response } from 'express';

import { SequelizeMeasureRepository } from '../../infrastructure/repositories/sequelizeMeasureRepository';
import { CreateMeasureUseCase } from '../../application/useCases/measure/createMeasureUseCase';
import { GenerateText } from '../../application/useCases/GenerateText';
import { geminiGateway, googleApiFileGateway } from '../../app';
import { Upload } from '../../application/useCases/Upload';
import { base64ToImage } from '../../utils/base64ToImage';

const measureRepository = new SequelizeMeasureRepository();

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

  const createMeasureUseCase = new CreateMeasureUseCase(measureRepository);
  const measure = await createMeasureUseCase.execute({
    customerId: customer_code,
    datetime: measure_datetime,
    type: measure_type,
  });

  if (result)
    res.status(201).json({
      image_url: fileResponse.file.uri,
      measure_uuid: measure.id,
      measure_value: JSON.parse(result).valor,
    });
  else res.sendStatus(400);
}

export default {
  upload,
};
