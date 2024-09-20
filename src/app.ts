import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Rotas
import customerRoutes from './interfaceAdapters/routes/customerRoutes';
import consumptionRoutes from './interfaceAdapters/routes/consumptionRoutes';

// Gateways
import { GeminiAIGateway } from './interfaces/gateways/GeminiAIGateway';
import { GoogleApiFileGateway } from './interfaces/gateways/GoogleApiFileGateway';

// Infra
import sequelize from './infrastructure/database/postgresConnection';

const apiKey = process.env.GEMINI_API_KEY || '';
export const googleApiFileGateway = new GoogleApiFileGateway(apiKey);
export const geminiGateway = new GeminiAIGateway(apiKey);

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/api', customerRoutes);
app.use('/api/consumption/', consumptionRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send(error.message);
});

sequelize.sync().then(() => {
  console.log('Banco de dados conectado e sincronizado.');
});

export default app;
