import { Request, Response } from "express";
import { RegisterBankInformationService } from "../services/RegisterBankInformationService";

class RegisterBankInformationController{
    async handle(req: Request, res: Response){
        const { user_id, renda_mensal, despesas_fixas, despesas_variaveis, objetivo_financeiro, perfil_risco, patrimonio_atual  } = req.body; 
        
        const registerBankInformationService = new RegisterBankInformationService();

        const finProfile = registerBankInformationService.execute({
            user_id,
            renda_mensal,
            despesas_fixas,
            despesas_variaveis,
            objetivo_financeiro,
            perfil_risco,
            patrimonio_atual
        });

        return res.json(finProfile);    
    }
}

export { RegisterBankInformationController }