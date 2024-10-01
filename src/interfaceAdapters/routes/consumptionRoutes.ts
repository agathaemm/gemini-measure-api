import { Router } from 'express';

import consumptionController from '../controllers/consumptionController';
import { uploadValidator } from '../middlewares/uploadValidator';
import { confirmValidator } from '../middlewares/confirmValidator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

router.post(
  '/upload',
  uploadValidator,
  validationMiddleware,
  consumptionController.upload,
);
router.patch('/confirm', confirmValidator, consumptionController.confirm);

export default router;
