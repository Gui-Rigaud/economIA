import { Router } from "express";

// -- Importando o arquivo pra cadastrar informações bancárias -- 

import { RegisterBankInformationController } from "./controllers/RegisterBankInformationController";

// -- Importando os arquivos para cadastro e listagem de categorias -- 

import { CreateCategoryController } from "./controllers/CreateCategoryController";
import { ListCategoryController } from "./controllers/ListCategoryController";

const router = Router();

// -- Rota de cadastro das informações bancárias --

router.post("/economIA/sendBankInfo", new RegisterBankInformationController().handle)

// -- Rota de Categorias -- 

router.post("", new CreateCategoryController().handle)
router.get("", new ListCategoryController().handle)

export { router };