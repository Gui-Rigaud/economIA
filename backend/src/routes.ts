import { Router } from "express";

// -- Cadastro de informações bancárias -- 

import { RegisterBankInformationController } from "./controllers/RegisterBankInformationController";

const router = Router();

// -- Rota de cadastro das informações bancárias --

router.post("/sendBankInfo", new RegisterBankInformationController().handle)


export { router };