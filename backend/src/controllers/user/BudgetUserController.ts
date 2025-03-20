import { Request, Response } from "express";
import { BudgetUserService } from "../../services/user/BudgetUserService";

class BudgetUserController{
    async handle(req: Request, res: Response){
        const user_id = req.query.user_id as string;

        if (!user_id) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const budgetUserService = new BudgetUserService();

        const budget = await budgetUserService.execute(user_id)

        return res.json(budget)

    }

}

export { BudgetUserController }
