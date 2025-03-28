// server.ts (ou netlify/functions/server.ts)
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';
import initializecategories from './utilities/initializecategories';
import serverless from 'serverless-http';

const app = express();
app.use(express.json());
app.use(cors());

// Prefixo para todas as rotas (ex: /api/users)
app.use('/api', router);

// Inicializa o banco de dados apenas uma vez (em produção)
let isInitialized = false;
const initDB = async () => {
  if (!isInitialized) {
    await initializecategories();
    isInitialized = true;
  }
};

// Handler serverless
export const handler = serverless(app, {
  request: async (request, event, context) => {
    await initDB(); // Garante que o DB está pronto
    return request;
  }
});