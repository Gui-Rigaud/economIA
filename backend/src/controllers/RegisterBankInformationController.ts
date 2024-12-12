import { Request, Response } from "express";
import { RegisterBankInformationService } from "../services/RegisterBankInformationService";
import { CsvParser } from "csv-parser";

class RegisterBankInformationController{
    async handle(req: Request, res: Response){
        const { user_id } = req.body; 
        
        const registerBankInformationService = new RegisterBankInformationService();

        if (!req.file){
            throw new Error("Error upload file");
        }else{
            const { originalname, filename: csv_file } = req.file;

            const product = await registerBankInformationService.execute({
                user_id,
                csv_file
            });
            return res.json("Informações bancárias registradas");
        }
    }
}

export { RegisterBankInformationController }