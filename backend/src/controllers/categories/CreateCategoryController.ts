import { Request, Response } from "express";
//import { CreateCategoryService } from "../../services/categories/CreateCategoryService";

class CreateCategoryController{
    async handle(req: Request, res: Response){

        //const createCategoryService = new CreateCategoryService;

        //const category = await createCategoryService.execute(req.body);

        return res.json({"oi": "tchau"});
    }
}

export { CreateCategoryController }