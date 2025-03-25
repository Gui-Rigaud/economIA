import { Request, Response } from 'express';
import { PercentCategoriesService } from '../../services/gen-categories/PercentCategoriesService';

class PercentCategoriesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const percentCategoriesService = new PercentCategoriesService();
        const transactions = request.body;
        const despesasObj = transactions.pop();
        const despesas = despesasObj.despesas;
        transactions.pop();

        try {
            const categories = await percentCategoriesService.calcularPorcentagens(transactions, despesas);
            return response.json(categories);
        } catch (error) {
            return response.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export { PercentCategoriesController };