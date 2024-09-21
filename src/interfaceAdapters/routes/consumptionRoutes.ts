import { Router } from 'express';

import consumptionController from '../controllers/consumptionController';
import { consumptionValidator } from '../middlewares/consumptionValidator';
import { validationMiddleware } from '../middlewares/validationMiddleware';

const router = Router();

router.post(
  '/upload',
  consumptionValidator,
  validationMiddleware,
  consumptionController.upload,
);

export default router;
