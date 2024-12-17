import { Router } from "express";
import multer from "multer";
//import { isAuthenticated } from "./middlewares/isAuthenticated";

const multerConfig = multer();

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { RegisterBankInformationController } from "./controllers/user/RegisterBankInformationController";
import { RegisterBankTransactionController } from "./controllers/transactions/RegisterBankTransactionController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { CategorizeFinTransactionController } from "./controllers/categories/CategorizeFinTransactionController";

const router = Router();

// -- ROTAS USER --

router.post('/register/user', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

router.post("/register/user/profile", isAuthenticated, new RegisterBankInformationController().handle)

// -- ROTAS TRANSACTION --

router.post('/register/transaction', multerConfig.single('file'), new RegisterBankTransactionController().handle)

// -- ROTAS CATEGORIES -- 

router.put("", isAuthenticated, new CategorizeFinTransactionController().handle)


export { router };