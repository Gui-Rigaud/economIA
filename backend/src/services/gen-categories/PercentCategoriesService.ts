import { FileCopier } from "../../utilities/copyFile";
import { generate } from "../../utilities/vertexai";

const fs = require('fs').promises;

const prompt2 = "Faça a lista de objetos do arquivo JSON com somente a quantidade em porcentagem de cada categoria nas transações e o nome da categoria."

class PercentCategoriesService {

    async execute(transactions: any) {

        const transactionsList = transactions;

        try {
            const filePath = `${__dirname}/list_transactions.txt`;
            await fs.writeFile(filePath, JSON.stringify(transactionsList, null, 2));
            const copiador = new FileCopier(filePath);
            await copiador.execute();
            return generate(prompt2);
        } catch (error) {
            console.log(error);
        }
    }

}

export { PercentCategoriesService }