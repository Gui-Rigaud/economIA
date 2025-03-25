import { Router } from "express";
import multer from "multer";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { RegisterBankInformationController } from "./controllers/user/RegisterBankInformationController";
import { RegisterTransactionController } from "./controllers/transactions/RegisterTransactionController";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { DetailUserController } from "./controllers/user/DetailUserController";
import { PercentCategoriesController } from "./controllers/gen-categories/PercentCategoriesController";
import { BudgetUserController } from "./controllers/user/BudgetUserController";
import { SuggestionController } from "./controllers/suggestion/SuggestionController";
import { GenCategoriesController } from "./controllers/gen-categories/GenCategoriesController";
import {PerSuggestionController} from "./controllers/persuggestion/PerSuggestionController"; // Importe a função handle

const multerConfig = multer();
const router = Router();

// -- ROTAS USER --
router.post('/register/user', new CreateUserController().handle)
router.post('/login', new AuthUserController().handle)
router.post("/register/user/profile", isAuthenticated, new RegisterBankInformationController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle);
router.get('/budget', isAuthenticated, new BudgetUserController().handle);

// --ROTAS TRANSACTION--
router.post('/register/file', isAuthenticated, multerConfig.single('file'), new RegisterTransactionController().handle)
router.post('/generate-categories', isAuthenticated, new GenCategoriesController().handle)

// -- ROTAS CATEGORIES --
router.post("/percent-categories", isAuthenticated, new PercentCategoriesController().handle);

// -- ROTAS SUGGESTION --
router.get('/suggestion', isAuthenticated, new SuggestionController().handle)

// -- ROTAS AI SUGGESTIONS --
router.post('/per-suggestion', isAuthenticated , new PerSuggestionController().handle); // Use a função handle

export { router };