import { Request, Response } from "express";
import { RegisterTransactionService } from "../../services/transactions/RegisterBankTransactionService";


class RegisterBankTransactionController {
    async handle(req: Request, res: Response) {
        const { user_id } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "File is required" });
        }

        const registerBankTransactionService = new RegisterTransactionService();

        try {
            // Passa o buffer e o user_id para o service
            const transactions = await registerBankTransactionService.processFile(file.buffer, user_id);
            return res.json(transactions);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

export { RegisterBankTransactionController };