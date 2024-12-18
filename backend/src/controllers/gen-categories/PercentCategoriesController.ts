import { Request, Response } from 'express';
import { PercentCategoriesService } from '../../services/gen-categories/PercentCategoriesService';

class PercentCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const percentCategoriesService = new PercentCategoriesService();

        try {
            const categories = await percentCategoriesService.execute(request.body);
            return response.json(categories);
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export { PercentCategoriesController };