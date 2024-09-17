import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import customerRouter from './routers/customer.router';
import generateTextRouter from './routers/generateText.router';

import { GeminiAIGateway } from './interfaces/gateways/GeminiAIGateway';

const apiKey = process.env.GEMINI_API_KEY || '';
export const geminiGateway = new GeminiAIGateway(apiKey);

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/customers/', customerRouter);
app.use('/ai/', generateTextRouter);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
});

export default app;
