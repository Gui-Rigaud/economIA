import { Router } from "express";
import multer from "multer";
//import { isAuthenticated } from "./middlewares/isAuthenticated";

const multerConfig = multer();

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { RegisterBankInformationController } from "./controllers/user/RegisterBankInformationController";
import { RegisterBankTransactionController } from "./controllers/transactions/RegisterBankTransactionController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { GenCategoriesController } from "./controllers/gen-categories/GenCategoriesController";
import { ListTransactionsController } from "./controllers/transactions/ListTransactionsController";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/categories/CreateCategoryController";
import { CategorizeFinTransactionController } from "./controllers/transactions/CategorizeFinTransactionController";

const router = Router();

// -- ROTAS USER --

router.post('/register/user', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

router.post("/register/user/profile", isAuthenticated, new RegisterBankInformationController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle);

// --ROTAS TRANSACTION--

router.post('/register/transaction', multerConfig.single('file'), isAuthenticated, new RegisterBankTransactionController().handle)

router.get('/list/transactions', isAuthenticated, new ListTransactionsController().handle)

router.get('/gen-categories', isAuthenticated, new GenCategoriesController().handle);
// -- ROTAS CATEGORIES -- 

router.post("/categories/create", isAuthenticated, new CreateCategoryController().handle)

router.put("/transactions/update", isAuthenticated, new CategorizeFinTransactionController().handle)

export { router };