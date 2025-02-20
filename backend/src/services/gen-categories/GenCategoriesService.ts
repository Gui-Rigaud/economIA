import { CategorizeFinTransactionController } from "../../controllers/transactions/CategorizeFinTransactionController";
import { FileCopier } from "../../utilities/copyFile";
import { generate } from "../../utilities/vertexai";
import { CreateCategoryService } from "../categories/CreateCategoryService";
import { CategorizeFinTransactionService } from "../transactions/CategorizeFinTransactionService";

const fs = require('fs').promises;

const prompt = "Devolva a categoria de cada transação financeira na seguinte fatura de Cartão de Crédito, levando em conta somente o atributo descrição. Além disso, faça a lista de objetos do arquivo JSON com somente o id da transação e a categoria em cada objeto.";

class GenCategoriesService {

    async execute(transactions: any, user_id: string) {

        const transactionsList = transactions;

        try {
            const filePath = `${__dirname}/fatura_cartao.txt`;
            await fs.writeFile(filePath, JSON.stringify(transactionsList, null, 2)); // Create a new file
            const copiador = new FileCopier(filePath);
            await copiador.execute('fatura_cartao.txt');
            const ia_result = await generate(prompt, 'fatura_cartao.txt');
            await fs.unlink(filePath); // Delete the file after writing

            const createCategory = new CreateCategoryService();

            let categories_gen = [];

            ia_result.map(({ id, categoria }) => {
                if (!(categories_gen.includes(categoria))) {
                    categories_gen.push(categoria);
                }
            });

            try {
                await createCategory.execute({ categories_name: categories_gen });
            } catch (error) {
                console.log(error);
                throw new Error("Error while creating categories");
            }

            try {
                const categorizeService = new CategorizeFinTransactionService();

                console.log(ia_result);

                await categorizeService.execute({ transactions_list: ia_result, user_id: user_id });
            } catch (error) {
                console.log(error);
                throw new Error("Error while categorizing transactions");
            }

            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Error while generating categories");
        }
    }

}

export { GenCategoriesService }