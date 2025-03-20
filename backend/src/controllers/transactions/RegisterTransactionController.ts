import { Request, Response } from "express";
import { RegisterTransactionService } from "../../services/transactions/RegisterTransactionService";

class RegisterTransactionController {
    async handle(req: Request, res: Response) {
        const file = req.file;
        const { user_id } = req.body;

        if (!file) {
            return res.status(400).json({ error: "File is required" });
        }

        const registerBankTransactionService = new RegisterTransactionService();

        try {
            // Passa o buffer para o service
            const saveFile = await registerBankTransactionService.saveFile(user_id, file.buffer, file.originalname);
            return res.json(saveFile);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { RegisterTransactionController };