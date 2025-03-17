import { generate } from "../../utilities/vertexai";
import { CreateCategoryService } from "../categories/CreateCategoryService";
import { CategorizeFinTransactionService } from "../transactions/CategorizeFinTransactionService";

const fs = require("fs").promises;
const path = require("path");
const { Storage: GoogleCloudStorage } = require("@google-cloud/storage");

const prompt = "Devolva a categoria de cada transação financeira na seguinte fatura de Cartão de Crédito, levando em conta somente o atributo descrição ou estabelecimento. Além disso, faça a lista de objetos do arquivo JSON com somente o id da transação e a categoria em cada objeto.";

class GenCategoriesServicePDF {
    async execute() {
        const filePath = path.join(__dirname, "fatura.pdf");
        const storage = new GoogleCloudStorage();
        const bucketName = "fatura_cartao_1";
        const destinationPath = "pdf/fatura.pdf";

        try {
            try {
                await fs.access(filePath);
            } catch (err) {
                throw new Error("Arquivo fatura.pdf não encontrado.");
            }

            // Faz upload do PDF para o Google Cloud Storage
            const bucket = storage.bucket(bucketName);
            await bucket.upload(filePath, { destination: destinationPath });

            // Aguarda a propagação do GCS antes de chamar a IA
            await new Promise(resolve => setTimeout(resolve, 3000)); 

            const ia_result = await generate(prompt, "fatura.pdf");
            await fs.unlink(filePath);
            console.log("Arquivo deletado");

            // Processa as categorias retornadas pela IA
            console.log("Parou aqui -2")
            //const createCategory = new CreateCategoryService();
            console.log("Parou aqui -1")
            //let categories_gen = [];

            /*ia_result.forEach(({ id, categoria }) => {
                if (!categories_gen.includes(categoria)) {
                    categories_gen.push(categoria);
                }
            });*/

            /*try {
                console.log("Parou aqui 0")
                await createCategory.execute({ categories_name: categories_gen });
                console.log("Parou aqui 1")
            } catch (error) {
                console.log(error);
                throw new Error("Erro ao criar categorias");
            }

            try {
                console.log("Parou aqui 2")
                //const categorizeService = new CategorizeFinTransactionService();
                console.log("Parou aqui 3")
               // await categorizeService.execute({ transactions_list: ia_result, user_id: user_id });
                console.log("Parou aqui 4")
            } catch (error) {
                console.log(error);
                throw new Error("Erro ao categorizar transações");
            }


            console.log("Parou aqui 5")*/
            return ia_result;
        } catch (error) {
            console.log(error);
            throw new Error("Erro ao gerar categorias");
        }
    }
}

export { GenCategoriesServicePDF };