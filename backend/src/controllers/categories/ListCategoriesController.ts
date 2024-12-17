import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/categories/ListCategoriesService";

class ListCategoriesController{
    async handle(req: Request, res: Response){

        const { user_id } = req.body;

        const listCategoriesService = new ListCategoriesService();

        const categories = await listCategoriesService.execute(user_id);

        return res.json(categories);
    }
}

export { ListCategoriesController }