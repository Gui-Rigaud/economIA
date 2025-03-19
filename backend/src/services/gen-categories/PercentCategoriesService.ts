import { generate } from "../../utilities/vertexaiTxt";

const fs = require('fs').promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt2 = "Devolva um JSON com a frequência em porcentagem de cada categoria financeira, levando em consideração a soma dos valores de cada categoria em relação ao valor total das transações. O JSON deve conter objetos onde a chave 'categoria' representa o nome da categoria e a chave 'porcentagem' representa a porcentagem correspondente do valor total das transações. Certifique-se de que a soma de todas as porcentagens resulte em 100%.";

class PercentCategoriesService {

    async execute(transactions: any) {

        const transactionsList = transactions;
        const filePath = path.join(__dirname, "list_transactions.txt");

        try {
            await fs.writeFile(filePath, JSON.stringify(transactionsList, null, 2));
            const storage = new GoogleCloudStorage();
            const bucketName = "fatura_cartao_1";
            const destinationPath = "json/list_transactions.txt";
            const bucket = storage.bucket(bucketName);
            await bucket.upload(filePath, { destination: destinationPath });
            await fs.unlink(filePath);
            return generate(prompt2, 'list_transactions.txt');
        } catch (error) {
            console.log(error); 
        }
    }

}

export { PercentCategoriesService }