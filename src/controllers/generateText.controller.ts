import { Request, Response, NextFunction } from 'express';
import { geminiGateway } from '../app';
import { GenerateText } from '../application/useCases/GenerateText';

async function postText(req: Request, res: Response, next: NextFunction) {
  const prompt = req.body;
  const generateTextUseCase = new GenerateText(geminiGateway);
  const result = await generateTextUseCase.execute(prompt.prompt);
  if (result) res.status(201).json(result);
  else res.sendStatus(400);
}

export default {
  postText,
};
