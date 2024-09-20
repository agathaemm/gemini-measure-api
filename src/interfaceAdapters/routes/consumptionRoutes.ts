import { Router } from 'express';
import consumptionController from '../controllers/consumptionController';

const router = Router();

router.post('/upload', consumptionController.upload);

export default router;
