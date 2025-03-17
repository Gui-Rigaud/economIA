import { Request, Response } from "express";
import { RegisterTransactionPDFService } from "../../services/transactions/RegisterTransactionService";

class RegisterBankTransactionPDFController {
    async handle(req: Request, res: Response) {
        //const { user_id } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "File is required" });
        }

        const registerBankTransactionService = new RegisterTransactionPDFService();

        try {
            // Passa o buffer e o user_id para o service
            await registerBankTransactionService.saveFile(file.buffer, file.originalname);
            return res.json({ message: "File saved successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { RegisterBankTransactionPDFController };