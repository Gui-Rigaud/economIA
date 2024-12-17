import { Request, Response } from "express";
import { CategorizeFinTransactionService } from "../../services/categories/CategorizeFinTransactionService";

class CategorizeFinTransactionController{
    async handle(req: Request, res: Response){

        const { user_id, category_id } = req.body;

        const categorizeFinTransactionService = new CategorizeFinTransactionService;

        const category = await categorizeFinTransactionService.execute({user_id, category_id});

        return res.json(category);
    }
}

export { CategorizeFinTransactionController }