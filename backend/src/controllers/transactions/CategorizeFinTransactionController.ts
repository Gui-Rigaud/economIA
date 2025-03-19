import { Request, Response } from "express";
//import { CategorizeFinTransactionService } from "../../services/transactions/CategorizeFinTransactionService";

class CategorizeFinTransactionController{
    async handle(req: Request, res: Response){

        /*const { transactions_list } = req.body;

        const categorizeFinTransactionService = new CategorizeFinTransactionService;

        const category = await categorizeFinTransactionService.execute(transactions_list);*/

        return res.json({"oi": "tchau"});
    }
}

export { CategorizeFinTransactionController }