// server.ts (ou netlify/functions/server.ts)
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';
import initializecategories from './utilities/initializecategories';

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

// Verifica se está rodando no ambiente serverless ou local
if (process.env.NODE_ENV === 'production' && process.env.RENDER) {
  // Ambiente Render (não serverless)
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, async () => {
    await initDB(); // Inicializa o banco de dados
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  console.log("Error")
}