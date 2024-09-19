import { Router } from 'express';
import customerController from '../controllers/customerController';

const router = Router();

router.post('/customers', customerController.create);

export default router;
