import { Request, Response } from "express";
import { BudgetUserService } from "../../services/user/BudgetUserService";

class BudgetUserController{
    async handle(req: Request, res: Response){
        const { user_id } = req.body

        const budgetUserService = new BudgetUserService();

        const budget = await budgetUserService.execute(user_id)

        return res.json(budget)

    }

}

export { BudgetUserController }
