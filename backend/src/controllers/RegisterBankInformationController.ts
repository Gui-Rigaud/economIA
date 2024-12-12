import { Request, Response } from "express";
import { RegisterBankInformationService } from "../services/RegisterBankInformationService";
import { CsvParser } from "csv-parser";

class RegisterBankInformationController{
    async handle(req: Request, res: Response){
        const { user_id, csv_file } = req.body; 
        
        const registerBankInformationService = new RegisterBankInformationService();

        const finProfile = await registerBankInformationService.execute({
            user_id,
            csv_file
        });

        return res.json("Informações bancárias registradas")
    }
}

export { RegisterBankInformationController }