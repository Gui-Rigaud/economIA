import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/categories/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){

        const { user_id, category_name } = req.body;

        const createCategoryService = new CreateCategoryService;

        const category = await createCategoryService.execute(user_id);

        return res.json(category);
    }
}

export { CreateCategoryController }