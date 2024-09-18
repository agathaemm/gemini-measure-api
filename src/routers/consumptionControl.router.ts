import express from 'express';
import multer from 'multer';
import path from 'path';

import consumptionControlController from '../controllers/consumptionControl.controller';

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

const router = express.Router();

router.post(
  '/upload',
  upload.single('file'),
  consumptionControlController.upload,
);

export default router;
