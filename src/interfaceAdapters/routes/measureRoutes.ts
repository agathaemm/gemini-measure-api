import { Router } from 'express';

import consumptionController from '../controllers/measureController';
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
router.get('/:customer_code/list', consumptionController.listCustomerMeasures);

export default router;
