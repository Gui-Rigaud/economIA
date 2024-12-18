import { Request, Response } from 'express';
import { GenCategoriesService } from '../../services/gen-categories/GenCategoriesService';

class GenCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const genCategoriesService = new GenCategoriesService();

        try {
            const categories = await genCategoriesService.execute(request.body);
            return response.json(categories);
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export { GenCategoriesController };