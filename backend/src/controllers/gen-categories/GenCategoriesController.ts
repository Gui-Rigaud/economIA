import { Request, Response } from "express";
import { GenCategoriesService } from "../../services/gen-categories/GenCategoriesService";

class GenCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request.body;
        console.log("User ID recebido: ", user_id);
        const genCategoriesService = new GenCategoriesService();


        try {
            const categories = await genCategoriesService.execute(user_id);
            return response.json(categories);
        } catch (error) {
            return response.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export { GenCategoriesController };