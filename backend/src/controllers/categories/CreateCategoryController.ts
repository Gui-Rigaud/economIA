import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/categories/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){
        const { category_name } = req.body;

        const createCategoryService = new CreateCategoryService;

        const category = await createCategoryService.execute(category_name);

        return res.json(category);
    }
}

export { CreateCategoryController }