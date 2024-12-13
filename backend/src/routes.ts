import { Router } from "express";
import multer from "multer";


//import uploadConfig from './config/multer'

const multerConfig = multer();

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { RegisterBankTransactionController } from "./controllers/user/RegisterBankTransactionController";

const router = Router();

// --ROTAS USER--

router.post('/csvreader', multerConfig.single('file'), new RegisterBankTransactionController().handle)

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)





export { router };