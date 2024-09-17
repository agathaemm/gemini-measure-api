import express from 'express';

import generateTextController from '../controllers/generateText.controller';

const router = express.Router();

router.post('/generate-text', generateTextController.postText);

export default router;
