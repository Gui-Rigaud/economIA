import { FileCopier } from "../../utilities/copyFile";
import { generate } from "../../utilities/vertexai";

const fs = require('fs').promises;

const prompt2 = "Devolva um JSON com somente a frequência em porcentagem de cada categoria e o nome da categoria. No JSON, a categoria tem que ter o nome 'categoria' e a frequência tem que ter o nome 'porcentagem', ambas sem as aspas.";

class PercentCategoriesService {

    async execute(transactions: any) {

        const transactionsList = transactions;

        try {
            const filePath = `${__dirname}/list_transactions.txt`;
            await fs.writeFile(filePath, JSON.stringify(transactionsList, null, 2));
            const copiador = new FileCopier(filePath);
            await copiador.execute('list_transactions.txt');
            return generate(prompt2, 'list_transactions.txt');
        } catch (error) {
            console.log(error); 
        }
    }

}

export { PercentCategoriesService }