import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { router } from './routes';
import initializecategories from './utilities/initializecategories';

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

initializecategories().then(() => {
    app.listen(3000, () => {
        console.log('🚀 Servidor online!');
    });
}).catch(error => {
    console.error("❌ Erro ao inicializar banco de dados:", error);
});