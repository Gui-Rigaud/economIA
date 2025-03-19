import { Request, Response } from 'express';
//import { ListTransactionsService } from '../../services/transactions/ListTransactionsService';

class ListTransactionsController {
    async handle(req: Request, res: Response): Promise<Response> {
        const user_id = req.query.user_id as string;
        console.log("Teste")
        return res.json({"oi": "tchau"})

        /*const listTransactionsService = new ListTransactionsService();

        try {
            const transactions = await listTransactionsService.execute(user_id);
            return res.json(transactions);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }*/
    }
}

export { ListTransactionsController };