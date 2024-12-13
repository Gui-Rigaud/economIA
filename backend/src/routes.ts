import { Router } from "express";
import multer from "multer";
import uploadConfig from "./config/multer";

import { isAuthenticated } from "./middlewares/isAuthenticated";

// -- Cadastro e login de usuário -- 

import { CreateUserController } from "./controllers/CreateUserController";
import { AuthUserController } from "./controllers/AuthUserController";

// -- Cadastro de informações bancárias -- 

import { RegisterBankInformationController } from "./controllers/RegisterBankInformationController";

// -- Cadastro e listagem de categorias -- 

import { ListCategoryController } from "./controllers/ListCategoryController";

const router = Router();

// -- Rota de cadastro e login de usuário -- 

router.post("/cadastro", new CreateUserController().handle)
router.post("/login", new AuthUserController().handle)

// -- Rota de cadastro das informações bancárias --

router.post("/sendBankInfo", isAuthenticated, new RegisterBankInformationController().handle)

// -- Rota de Categorias -- 

router.get("/listCategories", new ListCategoryController().handle)

export { router };