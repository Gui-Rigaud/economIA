import { CategorizeFinTransactionController } from "../../controllers/transactions/CategorizeFinTransactionController";
import { FileCopier } from "../../utilities/copyFile";
import { generate } from "../../utilities/vertexai";
import { CreateCategoryService } from "../categories/CreateCategoryService";
import { CategorizeFinTransactionService } from "../transactions/CategorizeFinTransactionService";

const fs = require('fs').promises;

const prompt = "Devolva a categoria de cada transação financeira na seguinte fatura de Cartão de Crédito. Além disso, faça a lista de objetos do arquivo JSON com somente o id da transação e a categoria em cada objeto.";

class GenCategoriesService {

    async execute(transactions: any, user_id: string) {

        const transactionsList = transactions;

        try {
            await fs.writeFile('/home/guilherme-rigaud/economIA/backend/src/services/gen-categories/fatura_cartao.txt', JSON.stringify(transactionsList, null, 2));
            const copiador = new FileCopier('/home/guilherme-rigaud/economIA/backend/src/services/gen-categories/fatura_cartao.txt');
            await copiador.execute();
            const ia_result = await generate(prompt);

            const createCategory = new CreateCategoryService();

            ia_result.map(({id, categoria}) => {
                createCategory.execute({ category_name: categoria });
            });

            const categorizeService = new CategorizeFinTransactionService();

            await categorizeService.execute({ transactions_list: ia_result, user_id: user_id });

            return { status: 'ok' };
        } catch (error) {
            console.log(error);
        }
    }

}

export { GenCategoriesService }