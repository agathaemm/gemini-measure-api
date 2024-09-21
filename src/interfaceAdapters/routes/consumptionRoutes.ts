import { Router } from 'express';
import multer from 'multer';
import path from 'path';

import consumptionController from '../controllers/consumptionController';
import { consumptionValidator } from '../middlewares/consumptionValidator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

// Configurando armazenamento de arquivos no multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Diretório de upload
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname),
    );
  },
});
const upload = multer({ storage: storage });

const router = Router();

router.post(
  '/upload',
  consumptionValidator,
  validationMiddleware,
  upload.single('file'),
  consumptionController.upload,
);

export default router;
