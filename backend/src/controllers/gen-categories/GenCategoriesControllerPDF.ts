import { Request, Response } from "express";
import { GenCategoriesServicePDF } from "../../services/gen-categories/GenCategoriesServicePDF";

class GenCategoriesControllerPDF {
    async handle(request: Request, response: Response): Promise<Response> {
        const genCategoriesService = new GenCategoriesServicePDF();
        const { user_id } = request.body;

        try {
            const categories = await genCategoriesService.execute();
            return response.json(categories);
        } catch (error) {
            return response.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export { GenCategoriesControllerPDF };