import { getMonth, getYear, lastDayOfMonth } from 'date-fns';
import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { unlink } from 'fs';

import { SequelizeMeasureRepository } from '../../infrastructure/repositories/sequelizeMeasureRepository';
import { CreateMeasureUseCase } from '../../application/useCases/measure/createMeasureUseCase';
import { UpdateMeasureUseCase } from '../../application/useCases/measure/updateMeasureUseCase';
import { GenerateText } from '../../application/useCases/GenerateText';
import { geminiGateway, googleApiFileGateway } from '../../app';
import { Upload } from '../../application/useCases/Upload';
import { base64ToImage } from '../../utils/base64ToImage';

const measureRepository = new SequelizeMeasureRepository();

async function upload(req: Request, res: Response) {
  const { customer_code, measure_datetime, measure_type, file } = req.body;
  const filePath = base64ToImage(file);

  try {
    const year = getYear(new Date(measure_datetime));
    const month = getMonth(new Date(measure_datetime));
    const startDate = new Date(year, month, 1);
    const endDate = lastDayOfMonth(new Date(year, month + 1, 0));

    const hasMeasure = !!(await measureRepository.findOne({
      where: {
        customerId: customer_code,
        type: measure_type,
        datetime: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    }));

    if (hasMeasure) {
      throw {
        status_code: 409,
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      };
    }

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

    if (result) {
      return res.status(200).json({
        image_url: fileResponse.file.uri,
        measure_uuid: measure.id,
        measure_value: JSON.parse(result).valor,
      });
    }

    throw {
      error_code: 'GENERIC_ERROR',
      error_description: 'Não foi possível salvar os dados.',
    };
  } catch (err: any) {
    const { status_code, ...etc } = err;
    res.status(status_code ?? 400).json(etc);
  } finally {
    await unlink(filePath, () => {});
  }
}

async function confirm(req: Request, res: Response) {
  const { measure_uuid, confirmed_value } = req.body;

  try {
    const measure = await measureRepository.findById(measure_uuid);

    if (!measure) {
      throw {
        status_code: 404,
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura não encontrada',
      };
    }

    if (measure.confirmed) {
      throw {
        status_code: 409,
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura do mês já realizada',
      };
    }

    const updateMeasureUseCase = new UpdateMeasureUseCase(measureRepository);
    await updateMeasureUseCase.execute({
      ...measure,
      value: confirmed_value,
      confirmed: true,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (err: any) {
    const { status_code, ...etc } = err;
    res.status(status_code ?? 400).json(etc);
  }
}

export default {
  upload,
  confirm,
};
