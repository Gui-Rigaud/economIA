import { FileCopier } from "../../utilities/copyFile";
import { generate } from "../../utilities/vertexai";

const fs = require('fs').promises;

class GenCategoriesService {

    async execute(transactions: any) {

        const transactionsList = transactions;

        try {
            await fs.writeFile('/home/guilherme-rigaud/economIA/backend/src/services/gen-categories/fatura_cartao.txt', JSON.stringify(transactionsList, null, 2));
            const copiador = new FileCopier('/home/guilherme-rigaud/economIA/backend/src/services/gen-categories/fatura_cartao.txt');
            await copiador.execute();
            return generate();
        } catch (error) {
            console.log(error);
        }
    }

}

export { GenCategoriesService }