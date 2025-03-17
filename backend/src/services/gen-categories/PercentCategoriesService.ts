import { generate } from "../../utilities/vertexaiTxt";

const fs = require('fs').promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt2 = "Devolva um JSON com somente a frequência em porcentagem de cada categoria e o nome da categoria. No JSON, a categoria tem que ter o nome 'categoria' e a frequência tem que ter o nome 'porcentagem', ambas sem as aspas.";

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