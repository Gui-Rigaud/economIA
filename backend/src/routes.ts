import { Router } from "express";
import { isAuthenticated } from "./middlewares/isAuthenticated";

// -- Importando o arquivo pra cadastrar informações bancárias -- 

import { RegisterBankInformationController } from "./controllers/RegisterBankInformationController";

// -- Importando os arquivos para cadastro e listagem de categorias -- 

import { ListCategoryController } from "./controllers/ListCategoryController";

const router = Router();

// -- Rota de cadastro das informações bancárias --

router.post("/sendBankInfo", isAuthenticated, new RegisterBankInformationController().handle)

// -- Rota de Categorias -- 

router.get("/listCategories", new ListCategoryController().handle)

export { router };