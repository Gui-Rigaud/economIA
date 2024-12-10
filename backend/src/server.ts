import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';


import { router } from './routes'

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);

app.listen(3000, () => {
    console.log('Servidor online!')
});