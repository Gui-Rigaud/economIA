import { Router } from "express";
import multer from "multer";
//import { isAuthenticated } from "./middlewares/isAuthenticated";

const multerConfig = multer();

import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";

import { RegisterBankInformationController } from "./controllers/user/RegisterBankInformationController";
import { RegisterTransactionController } from "./controllers/transactions/RegisterTransactionController";

import { isAuthenticated } from "./middlewares/isAuthenticated";
import { ListTransactionsController } from "./controllers/transactions/ListTransactionsController";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { PercentCategoriesController } from "./controllers/gen-categories/PercentCategoriesController";

import { CreateCategoryController } from "./controllers/categories/CreateCategoryController";
import { CategorizeFinTransactionController } from "./controllers/transactions/CategorizeFinTransactionController";
import { BudgetUserController } from "./controllers/user/BudgetUserController";

import { SuggestionController } from "./controllers/suggestion/SuggestionController";
import { GenCategoriesController } from "./controllers/gen-categories/GenCategoriesController";

const router = Router();

// -- ROTAS USER --

router.post('/register/user', new CreateUserController().handle)

router.post('/login', new AuthUserController().handle)

router.post("/register/user/profile", isAuthenticated, new RegisterBankInformationController().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle);

router.get('/budget', isAuthenticated, new BudgetUserController().handle);

// --ROTAS TRANSACTION--


/* analisar de precisamos*/ router.get('/list/transactions', isAuthenticated, new ListTransactionsController().handle)

router.post('/register/file', isAuthenticated, multerConfig.single('file'), new RegisterTransactionController().handle)

router.post('/generate-categories', isAuthenticated, new GenCategoriesController().handle)
// -- ROTAS CATEGORIES -- 

router.post("/categories/create", isAuthenticated, new CreateCategoryController().handle)

router.put("/transactions/update", isAuthenticated, new CategorizeFinTransactionController().handle)

router.post("/percent-categories", isAuthenticated, new PercentCategoriesController().handle);


export { router };

// -- ROTAS SUGGESTION --
router.get('/suggestion', isAuthenticated, new SuggestionController().handle)